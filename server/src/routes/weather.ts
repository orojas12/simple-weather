import { Router } from "express";
import fetch from "node-fetch";

const { WEATHER_API_KEY } = process.env;
const weatherRouter = Router();

weatherRouter.get("/", async (req, res) => {
  if (!(req.query.lat && req.query.lng)) {
    res
      .status(400)
      .json({ message: "Required query parameters not specified" });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${req.query.lat}&lon=${req.query.lng}&exclude=minutely&appid=${WEATHER_API_KEY}`
    );
    const data = await response.json();

    if (!response.ok) {
      res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

export default weatherRouter;
