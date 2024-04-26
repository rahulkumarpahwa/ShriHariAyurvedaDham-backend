import { Slide } from "../models/slideModel.js";
import { Card } from "../models/cardModel.js";

export const fetchSlides = async (req, res) => {
  const slideData = await Slide.find();
  res.status(200).json(slideData);
};

export const fetchCards = async (req, res) => {
  const cardData = await Card.find();
  res.status(200).json(cardData);
};
