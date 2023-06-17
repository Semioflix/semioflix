import { Router, Request, Response } from "express";
import { connection } from "./database/connection";
import { Serie } from "./database/models/Serie";

import adminRoutes from "./routes/admin.routes";
import authenticateRoutes from "./routes/authenticate.routes";
import { Episode } from "./database/models/Episode";
import { Season } from "./database/models/Season";

class generalRoutes {
  public routes: Router = Router();

  constructor() {
    this.otherRoutes();
    this.config();
  }

  otherRoutes(): void {
    this.routes.use("/admin", adminRoutes);
    this.routes.use("/auth", authenticateRoutes);
  }

  config(): void {
    this.routes.get("/", async (req: Request, res: Response) => {

      const { data: series, error } = await connection.from("Series").select("*").eq("visible", true);

      return res.render("pages/dashboard", {
        title: "Dashboard",
        imports: "dashboard",
        series
      });
    });

    this.routes.get("/about", async (req: Request, res: Response) => {
      return res.render("pages/about", {
        title: "Sobre",
        imports: "about"
      });
    });

    this.routes.get("/serie/:id", async (req: Request, res: Response) => {
      const { id } = req.params;

      const { data: serie, error } = await connection.from("Series").select("*, Seasons(*)").eq("id", id).eq("visible", true).single();

      if (error) return res.status(400).json({ message: 'Ops! Ocorreu um erro ao buscar a série!', error });

      const object = new Serie(serie);
      object.setViews(Number(object.views) + 1);

      const { data: serieData, error: serieError } = await connection.from("Series").update(object).eq("id", id);
      if (serieError) return res.status(400).json({ message: 'Ops! Ocorreu um erro ao atualizar a série!', error });

      return res.render("pages/serie", {
        title: "Serie",
        imports: "serie",
        serie
      });
    });

    this.routes.post("/search", async (req: Request, res: Response) => {
      const { searchValue } = req.body;

      const { data: series, error } = await connection.from("Series").select("*").ilike("title", `%${searchValue}%`);

      if (error) return res.status(400).json({ message: 'Ops! Ocorreu um erro ao buscar a série!', error });

      return res.json(series);
    });

    this.routes.get("/watch/:seasonId/:epId", async (req: Request, res: Response) => {
      const { seasonId, epId } = req.params;

      const { data: season } = await connection.from("Seasons").select("*").eq("id", seasonId).single();
      const ep = season.episodes.find((ep: any) => ep.id === epId);

      const se = new Season(season);
      const episode = new Episode(ep);
                  
      return res.render("pages/watch", {
        title: ep.title,
        imports: "watch",
        ep,
        season
      });
    });

    this.routes.post("/episode/view", async (req: Request, res: Response) => {
      const { seasonId, epId } = req.body;

      const { data } = await connection.from("Seasons").select("*").eq("id", seasonId).single();

      const season = new Season(data);
      season.viewIncrement(epId);

      const { data: seasonData, error: seasonError } = await connection.from("Seasons").update(season).eq("id", seasonId);

      return res.json(seasonData);
    });

  }
}

export default new generalRoutes().routes;