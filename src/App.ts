import express from "express";
import cors from "cors";
import generalRoutes from "./routes";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));

    this.express.set("view engine", "pug");
    this.express.use("/public/", express.static("public/"));
    this.express.use("/fontawesome/", express.static("node_modules/@fortawesome/fontawesome-free/"));
  }

  private routes(): void {
    this.express.use("/", generalRoutes);

    /* Error page */

    this.express.use(async (req, res) => {
      return res.status(404).render("404", {
        title: "Página não encontrada"
      });
    });
  }
}

export default new App().express;