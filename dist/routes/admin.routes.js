"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _express = require('express');
var _connection = require('../database/connection');
var _authenticate = require('../database/authenticate');
var _uploads = require('../database/uploads');
var _Season = require('../database/models/Season');
var _Episode = require('../database/models/Episode');

const auth = _authenticate.authenticate.call(void 0, );

var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _Serie = require('../database/models/Serie');
var _User = require('../database/models/User');
var _App = require('../App'); var _App2 = _interopRequireDefault(_App);

class adminRoutes {
   __init() {this.routes = _express.Router.call(void 0, )}

  constructor() {;adminRoutes.prototype.__init.call(this);
    this.config();
  }

  config() {
    this.routes.get("/signin", async (req, res) => {
      return res.render("admin/signin", {
        title: "Faça login para continuar",
        imports: "signin"
      });
    });

    this.routes.get("/", auth.auth, async (req, res) => {
      const { data: series } = await _connection.connection.from("Series").select("*");

      return res.render("admin/dashboard", {
        title: "Dashboard",
        imports: "dashboard",
        series
      });
    });

    this.routes.get("/serie/:id", auth.auth, async (req, res) => {
      const { id } = req.params;

      const { data: serie, error } = await _connection.connection.from("Series").select("*, Seasons(*)").eq("id", id).single();

      if (error) return res.status(400).json({ message: 'Ops! Ocorreu um erro ao buscar a série!', error });

      return res.render("admin/serie", {
        title: serie.title,
        imports: "serie",
        serie
      });
    });

    this.routes.post("/serie/create", auth.auth, _uploads.uploadImage.single('cover'), async (req, res) => {
      const user = new (0, _User.User)(_App2.default.get('user'));

      const { title, description, cast, visible } = req.body;
      const cover = req.file;

      if (!title || !description || !cast || !visible) return res.status(400).json({ message: 'Ops! Você deve preencher todos os campos para continuar!' });
      if (!cover) return res.status(400).json({ message: 'Ops! Você deve selecionar um arquivo para continuar!' });

      const dist = title.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join("").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      const { data, error } = await _connection.connection.storage.from("Semioflix").upload(`/series/${dist}/cover.${cover.mimetype.split('/')[1]}`, _fs2.default.readFileSync(cover.path), {
        cacheControl: '3600',
        upsert: false
      });

      _fs2.default.unlinkSync(cover.path);

      const serie = new (0, _Serie.Serie)({
        title,
        description,
        cast,
        visible,
        cover: `https://yizosayzoigeczzlmyae.supabase.co/storage/v1/object/public/${_optionalChain([data, 'optionalAccess', _2 => _2.Key])}`,
        createdBy: user.getId()
      })

      const { data: serieData, error: serieError } = await _connection.connection.from("Series").insert(serie);

      if (serieError) return res.status(400).json({ message: 'Ops! Ocorreu um erro ao criar a série!', error });

      if (error) return res.status(400).json({ message: 'Ops! Ocorreu um erro ao fazer o upload da imagem!', error });

      return res.status(200).render("admin/serie/" + serie.getId(), {
        title: serie.getTitle(),
        imports: "serie",
        serie
      });
    });

    this.routes.post("/season/create", auth.auth, _uploads.uploadVideos.array('videos[]'), async (req, res) => {
      const episodes = req.files;


      const id = req.body.serieId;
      const title = req.body['season-title'];

      delete req.body.serieId;
      delete req.body['season-title'];

      const { data: serie } = await _connection.connection.from("Series").select("*, Seasons(id, title)").eq("id", id).single();

      if (!serie) return res.status(400).json({ message: 'Ops! A série não foi encontrada!' });

      const seasonsQuantity = serie.Seasons.length + 1;
      const dist = process.env.STORAGE + "/series/" + serie.title.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join("").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const url = serie.title.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join("").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      if (!episodes) return res.status(400).json({ message: 'Ops! Você deve selecionar um arquivo para continuar!' });

      episodes.forEach(async (ep, index) => {
        const { data, error } = await _connection.connection.storage.from("Semioflix").upload(`/series/${url}/season-${seasonsQuantity}/ep-${index + 1}.${ep.mimetype.split('/')[1]}`, _fs2.default.readFileSync(ep.path), {
          cacheControl: '3600',
          upsert: false
        });

        if (!data || error) return res.status(400).json({ message: 'Ops! Ocorreu um erro ao fazer o upload do vídeo!', error });

        _fs2.default.unlinkSync(ep.path);
      })

      let season = new (0, _Season.Season)({
        serieId: id,
        title,
        episodes: Array.from({ length: Object.keys(req.body).length / 3 }, (_, index) => {
          let ep = new (0, _Episode.Episode)({
            title: req.body["ep-" + (index + 1) + "-title"],
            description: req.body["ep-" + (index + 1) + "-description"],
            url: dist + "/season-" + seasonsQuantity + "/ep-" + (index + 1) + "." + episodes[index].mimetype.split('/')[1],
            visible: req.body["ep-" + (index + 1) + "-visible"],
          })

          return ep;

        }).filter((e) => e !== null)
      })

      const { data: seasonData, error: seasonError } = await _connection.connection.from("Seasons").insert(season);

      if (seasonError) return res.status(400).json({ message: 'Ops! Ocorreu um erro ao criar a temporada!', seasonError });

      return res.status(200).redirect('/serie/' + id);
    });
  }
}

exports. default = new adminRoutes().routes;