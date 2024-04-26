import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    imageId: {
      type: String,
    },
    keyReasons: [String],
  },
  {
    timestamps: true,
  }
);

export const Card = mongoose.model("Card", cardSchema);
