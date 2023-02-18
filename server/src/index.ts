import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const host = process.env.HOST || "127.0.0.1";
const port = parseInt(process.env.PORT || "8080");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, host, () => {
  console.log(`App is running at http://${host}:${port}/`);
});
