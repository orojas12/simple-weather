import { Router } from "express";
import fetch from "node-fetch";

const { PLACES_API_KEY } = process.env;
const placesRouter = Router();

interface Place {
  description: string;
  placeId: string;
  mainText: string;
  secondaryText: string;
}

placesRouter.get("/places", async (req, res) => {
  if (!req.query.search) {
    return res
      .status(400)
      .json({ message: "Missing required query parameters." });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.search}&types=locality&key=${PLACES_API_KEY}`
    );
    const data = await response.json();
    if (!response.ok) {
      res.status(response.status).json(data);
    }
    const predictions: any[] = data.predictions;
    const places: Place[] = predictions.map((prediction) => {
      return {
        placeId: prediction.place_id,
        description: prediction.description,
        mainText: prediction.structured_formatting.main_text,
        secondaryText: prediction.structured_formatting.secondary_text,
      };
    });
    res.json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

export default placesRouter;
