"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _connection = require('./database/connection');
var _Serie = require('./database/models/Serie');
var _adminroutes = require('./routes/admin.routes'); var _adminroutes2 = _interopRequireDefault(_adminroutes);

class generalRoutes {
   __init() {this.routes = _express.Router.call(void 0, )}

  constructor() {;generalRoutes.prototype.__init.call(this);
    this.otherRoutes();
    this.config();
  }

  otherRoutes() {
    this.routes.use("/admin", _adminroutes2.default);
  }

  config() {
    this.routes.get("/", async (req, res) => {

      const { data: series, error } = await _connection.connection.from("Series").select("*").eq("visible", true);

      return res.render("pages/dashboard", {
        title: "Dashboard",
        imports: "dashboard",
        series
      });
    });

    this.routes.get("/about", async (req, res) => {
      return res.render("pages/about", {
        title: "Sobre",
        imports: "about"
      });
    });

    this.routes.get("/serie/:id", async (req, res) => {
      const { id } = req.params;

      const { data: serie, error } = await _connection.connection.from("Series").select("*, Seasons(*)").eq("id", id).eq("visible", true).single();

      if (error) return res.status(400).json({ message: 'Ops! Ocorreu um erro ao buscar a série!', error });

      const object = new (0, _Serie.Serie)(serie);
      object.setViews(Number(object.views) + 1);

      const { data: serieData, error: serieError } = await _connection.connection.from("Series").update(object).eq("id", id);
      if (serieError) return res.status(400).json({ message: 'Ops! Ocorreu um erro ao atualizar a série!', error });

      return res.render("pages/serie", {
        title: "Serie",
        imports: "serie",
        serie
      });
    });

    this.routes.post("/search", async (req, res) => {
      const { searchValue } = req.body;

      const { data: series, error } = await _connection.connection.from("Series").select("*").ilike("title", `%${searchValue}%`);

      if (error) return res.status(400).json({ message: 'Ops! Ocorreu um erro ao buscar a série!', error });

      return res.json(series);
    });

    this.routes.get("/watch/:seasonId/:epId", async (req, res) => {
      const { seasonId, epId } = req.params;

      const { data: season } = await _connection.connection.from("Seasons").select("*").eq("id", seasonId).single();
      const ep = season.episodes.find((ep) => ep.id === epId);
      
      return res.render("pages/watch", {
        title: ep.title,
        imports: "watch",
        ep,
        season
      });
    });
  }
}

exports. default = new generalRoutes().routes;