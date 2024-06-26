import express from "express";
import {
  checkout,
  paymentVerification,
  userData,
} from "../controllers/paymentController.js";
import { fetchPayments } from "../controllers/fetchPaymentControllers.js";
import { getSlotTime } from "../controllers/getSlotTime.js";
import TryCatchWrap from "../utils/TryCatchWrap.js";
const router = express.Router();

router.route("/checkout").post(TryCatchWrap(checkout));
router.route("/userdata").post(TryCatchWrap(userData));
router.route("/paymentVerification").post(TryCatchWrap(paymentVerification));
router.route("/fetchpayments").get(TryCatchWrap(fetchPayments));
router.route("/gettimeslot/:date").get(TryCatchWrap(getSlotTime));

export default router;
