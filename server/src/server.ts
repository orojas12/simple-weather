import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { weatherRouter } from "./routes";
import { errorLogger, accessLogger } from "./middleware";

const app = express();
const host = process.env.HOST || "127.0.0.1";
const port = parseInt(process.env.PORT || "8080");

app.use(errorLogger, accessLogger);
app.use("/weather", weatherRouter);

app.listen(port, host, () => {
  console.log(`App is running at http://${host}:${port}/`);
});
