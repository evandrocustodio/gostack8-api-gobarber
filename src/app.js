import "dotenv/config";
import Youch from "youch";
import express from "express";
import path from "path";
import routes from "./routes";
import cors from "cors";

import "./database";

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routers();
  }

  middleware() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
    );
  }

  routers() {
    this.server.use(routes);
    this.exceptionHandler();
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === "develop") {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: " Internal Server Error" });
    });
  }
}

export default new App().server;
