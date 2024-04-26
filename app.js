import express from "express";
import paymentRoutes from "./routes/paymentRoutes.js";
import dataListings from "./routes/dataListings.js";
import cors from "cors";
import ExpressError from "./utils/ExpressError.js";
import path from "path";
import { fileURLToPath } from "url";

import { config } from "dotenv";
config();
export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));

app.use(
  cors({
    origin: ["https://shrihariayurvedadham.netlify.app"],
    // origin: ["http://localhost:1234"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api", paymentRoutes);
app.use("/data", dataListings);

app.get("/api/hello", (req, res) => {
  res.status(200).json("server is working");
});

app.get("/api/getKey", (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
});

//page not found!
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "PAGE NOT FOUND!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went Wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message, statusCode });
  // res.status(statusCode).json({ status: err.statusCode, message : err.message  });
});
