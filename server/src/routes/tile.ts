import { Router } from "express";
import fetch from "node-fetch";

const { WEATHER_API_KEY } = process.env;
const tileRouter = Router();

tileRouter.get("/tile/:layer/:z/:x/:y.png", async (req, res) => {
  const { layer, z, x, y } = req.params;
  try {
    const response = await fetch(
      `https://tile.openweathermap.org/map/${layer}/${z}/${x}/${y}.png?appid=${WEATHER_API_KEY}`
    );
    const tile = await response.buffer();
    res.status(response.status).set({ "Content-Type": "image/png" }).send(tile);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

export default tileRouter;
