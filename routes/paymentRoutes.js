import express from "express";
import {
  checkout,
  paymentVerification,
  userData,
} from "../controllers/paymentController.js";
import { fetchPayments } from "../controllers/fetchPaymentControllers.js";
const router = express.Router();

router.route("/checkout").post(checkout);
router.route("/userdata").post(userData);
router.route("/paymentVerification").post(paymentVerification);
router.route("/fetchpayments").get(fetchPayments);

export default router;
