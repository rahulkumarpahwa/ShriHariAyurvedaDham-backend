import express from "express";
import { fetchSlides, fetchCards } from "../controllers/fetchListings.js";
import TryCatchWrap from "../utils/TryCatchWrap.js";

const router = express.Router();

router.route("/slides").get(TryCatchWrap(fetchSlides));
router.route("/cards").get(TryCatchWrap(fetchCards));

export default router;
