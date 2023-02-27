import { Router } from "express";

const weatherRouter = Router();

weatherRouter.get("/", (req, res) => {
  res.send("Weather");
});

export default weatherRouter;
