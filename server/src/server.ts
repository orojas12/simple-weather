import * as dotenv from "dotenv";
dotenv.config();

import express, { Router } from "express";
import { weatherRouter, placesRouter } from "./routes";
import { errorLogger, accessLogger } from "./middleware";

const app = express();
const host = process.env.HOST || "127.0.0.1";
const port = parseInt(process.env.PORT || "8080");

const router = Router();

router.use("/api", [weatherRouter, placesRouter]);

app.use(errorLogger, accessLogger);
app.use(router);

app.listen(port, host, () => {
  console.log(`App is running at http://${host}:${port}/`);
});
