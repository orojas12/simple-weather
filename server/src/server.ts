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

const errorLogStream = fs.createWriteStream(
  path.resolve(__dirname, "../logs/error.log"),
  { flags: "a" }
);

const app = express();
const host = process.env.HOST || "127.0.0.1";
const port = parseInt(process.env.PORT || "8080");

app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms',
    {
      stream: errorLogStream,
      skip: function (req, res) {
        return res.statusCode < 500;
      },
    }
  )
);

app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms',
    { stream: accessLogStream }
  )
);

app.use("/weather", weatherRouter);

app.listen(port, host, () => {
  console.log(`App is running at http://${host}:${port}/`);
});
