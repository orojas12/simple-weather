import * as dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";
import express from "express";
import morgan from "morgan";
import { weatherRouter } from "./routes";

const accessLogStream = fs.createWriteStream(
  path.resolve(__dirname, "../logs/access.log"),
  { flags: "a" }
);

const app = express();
const host = process.env.HOST || "127.0.0.1";
const port = parseInt(process.env.PORT || "8080");

app.use(morgan("short", { stream: accessLogStream }));
app.use("/weather", weatherRouter);

app.listen(port, host, () => {
  console.log(`App is running at http://${host}:${port}/`);
});
