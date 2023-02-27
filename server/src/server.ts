import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { weatherRouter } from "./routes";

const app = express();
const host = process.env.HOST || "127.0.0.1";
const port = parseInt(process.env.PORT || "8080");

app.use("/weather", weatherRouter);

app.listen(port, host, () => {
  console.log(`App is running at http://${host}:${port}/`);
});
