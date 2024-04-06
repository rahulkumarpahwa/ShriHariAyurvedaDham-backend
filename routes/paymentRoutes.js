import express from "express";
import {checkout, paymentVerification, userData} from "../controllers/paymentController.js";
const router = express.Router();

router.route("/checkout").post(checkout);
router.route("/userdata").post(userData);
router.route("/paymentVerification").post(paymentVerification);


export default router;
