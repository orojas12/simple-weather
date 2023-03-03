import { Router } from "express";
import fetch from "node-fetch";

const { GEOCODE_API_KEY } = process.env;
const geocodeRouter = Router();

interface GeocodeResult {
  placeId: string;
  address: string;
  lat: string;
  lng: string;
}

geocodeRouter.get("/geocode", async (req, res) => {
  if (!req.query.placeId) {
    return res
      .status(400)
      .json({ message: "Missing required query parameters." });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?place_id=${req.query.placeId}&key=${GEOCODE_API_KEY}`
    );
    const data = await response.json();
    if (!response.ok) {
      res.status(response.status).json(data);
      return;
    }
    const results: any[] = data.results;
    if (results.length) {
      const geocodeResult: GeocodeResult = {
        placeId: results[0].placeId,
        address: results[0].formatted_addres,
        lat: results[0].geometry.location.lat,
        lng: results[0].geometry.location.lng,
      };
      res.json(geocodeResult);
    } else {
      res.status(404).json({ message: "No results found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

export default geocodeRouter;
