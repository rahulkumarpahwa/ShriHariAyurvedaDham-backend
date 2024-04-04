import express from "express";
import paymentRoutes from "./routes/paymentRoutes.js";
import cors from "cors";

import { config } from "dotenv";
config();
export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/api", paymentRoutes);

app.get("/api/hello", (req,res)=>{
res.send("server is working");
});

app.get("/api/getKey", (req, res) => {
  res.status(200).json({key : process.env.RAZORPAY_API_KEY});
});
