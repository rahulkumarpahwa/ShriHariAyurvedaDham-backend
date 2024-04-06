import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/paymentModel.js";

export const checkout = async (req, res) => {
  const amount = req.body.amount;
  var options = {
    amount: Number(amount * 100), // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  const order = await instance.orders.create(options);
  console.log(order);
  res.json({ success: "order success", order });
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
    console.log(req.body);
  let body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    res.redirect(
      `https://shrihariayurvedadham.netlify.app/paymentSuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({ success: false });
  }
  //   response = { signatureIsValid: "true" };
  // res.send(response);
};
