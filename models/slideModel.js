import mongoose from "mongoose";

const slideSchema = new mongoose.Schema(
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
    keyBenefits: [String],
  },
  {
    timestamps: true,
  }
);

export const Slide = mongoose.model("Slide", slideSchema);
