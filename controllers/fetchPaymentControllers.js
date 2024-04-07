import { Payment } from "../models/paymentModel.js";

export const fetchPayments = async (req,res)=>{
const arr = await Payment.find().populate("user");
// console.log(arr[arr.length-1].user[0].name);
res.send(arr);

};