import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/paymentModel.js";
import { User } from "../models/userModel.js";


let userInfo;

export const checkout = async (req, res) => {
  const amount = req.body.amount;
  var options = {
    amount: Number(amount * 100), // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  const order = await instance.orders.create(options);
  // console.log(order);
  return res.status(200).json({ success: "order success", order });
};

export const userData = (req, res) => {
  // console.log(req.body);
  userInfo = req.body;
  // console.log("req has received");
  // console.log(userInfo);
 return res.end();
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  // console.log(req.body);
  // console.log(userInfo);
  let body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    const newPayment = new Payment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    const newUser = new User(userInfo);
    newPayment.user.push(newUser);
    await newUser.save();
    await newPayment.save();

    // console.log(newPayment);
    res.status(200).redirect(
      `https://shrihariayurvedadham.netlify.app/paymentSuccess?reference=${razorpay_payment_id}`
      //`http://localhost:1234/paymentSuccess?reference=${razorpay_payment_id}`

    );
  } else {
    res.status(400).json({ success: false });
  }
  //   response = { signatureIsValid: "true" };
  // res.send(response);
};
