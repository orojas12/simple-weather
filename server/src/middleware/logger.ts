import fs from "fs";
import path from "path";
import morgan from "morgan";

const accessLogStream = fs.createWriteStream(
  path.resolve(__dirname, "../../logs/access.log"),
  { flags: "a" }
);

const errorLogStream = fs.createWriteStream(
  path.resolve(__dirname, "../../logs/error.log"),
  { flags: "a" }
);

export const errorLogger = morgan(
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms',
  {
    stream: errorLogStream,
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  }
);

export const accessLogger = morgan(
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms',
  { stream: accessLogStream }
);
