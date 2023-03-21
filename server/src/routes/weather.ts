import { Router } from "express";
import fetch from "node-fetch";

const { WEATHER_API_KEY } = process.env;
const weatherRouter = Router();

weatherRouter.get("/weather", async (req, res) => {
  if (!(req.query.lat && req.query.lng)) {
    return res
      .status(400)
      .json({ message: "Required query parameters not specified" });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${req.query.lat}&lon=${req.query.lng}&exclude=minutely&units=imperial&appid=${WEATHER_API_KEY}`
    );
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    res.set("Cache-Control", "max-age=300, must-revalidate").json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

export default weatherRouter;
