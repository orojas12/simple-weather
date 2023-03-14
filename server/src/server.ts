import * as dotenv from "dotenv";
dotenv.config();

import express, { Router } from "express";
import { weatherRouter, placesRouter, geocodeRouter } from "./routes";
import { errorLogger, accessLogger } from "./middleware";

const app = express();
const host = process.env.HOST || "0.0.0.0";
const port = parseInt(process.env.PORT || "8080");

const router = Router();

router.use("/api", weatherRouter, placesRouter, geocodeRouter);

app.use(errorLogger, accessLogger);
app.use(router);

app.listen(port, host, () => {
  console.log(`App is running at http://${host}:${port}/`);
});
