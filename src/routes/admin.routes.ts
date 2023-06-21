import { Router, Request, Response } from "express";
import { connection } from "../database/connection";
import { authenticate } from "../database/authenticate";
import { uploadImage, uploadImages, uploadVideo, uploadVideos, uploadSeason } from "../database/uploads";
import { Season } from "../database/models/Season";
import { Episode } from "../database/models/Episode";

import fs from "fs";
import { Serie } from "../database/models/Serie";

import "dotenv/config";

class adminRoutes {
  public routes: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.routes.get("/signin", async (req: Request, res: Response) => {
      return res.render("admin/signin", {
        title: "Faça login para continuar",
        imports: "signin"
      });
    });

    this.routes.get("/", async (req: Request, res: Response) => {
      const { data: series } = await connection.from("Series").select("*");

      return res.render("admin/dashboard", {
        title: "Dashboard",
        imports: "dashboard",
        series
      });
    });

    this.routes.get("/serie/:id", async (req: Request, res: Response) => {
      const { id } = req.params;

      const { data: serie, error } = await connection.from("Series").select("*, Seasons(*)").eq("id", id).single();

      if (error) return res.status(400).json({ message: 'Ops! Ocorreu um erro ao buscar a série!', error });

      return res.render("admin/serie", {
        title: serie.title,
        imports: "serie",
        serie
      });
    });

    this.routes.post("/serie/create", uploadImages.fields([{ name: 'cover', maxCount: 1 }, { name: 'background', maxCount: 1 }]), async (req: Request, res: Response) => {
      const { title, description, cast, visible } = req.body;

      if (!req.files) return res.status(400).json({ message: 'Ops! Você deve selecionar um arquivo para continuar!' });

      const cover = req.files['cover'][0];
      const background = req.files['background'][0];

      if (!title || !description || !cast || !visible) return res.status(400).json({ message: 'Ops! Você deve preencher todos os campos para continuar!' });
      if (!cover) return res.status(400).json({ message: 'Ops! Você deve selecionar um arquivo para continuar!' });

      const dist = title.split(' ').map((word: string) => word[0].toUpperCase() + word.slice(1)).join("").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      const { data: dataCover, error: coverError } = await connection.storage.from("Semioflix").upload(`/series/${dist}/cover.${cover.mimetype.split('/')[1]}`, fs.readFileSync(cover.path), {
        cacheControl: '3600',
        upsert: false,
        contentType: cover.mimetype
      });

      const { data: dataBackground, error: backgroundError } = await connection.storage.from("Semioflix").upload(`/series/${dist}/background.${background.mimetype.split('/')[1]}`, fs.readFileSync(background.path), {
        cacheControl: '3600',
        upsert: false,
        contentType: background.mimetype
      });

      if (coverError || backgroundError) return res.status(400).json({ message: 'Ops! Ocorreu um erro ao fazer o upload da imagem!', error: coverError || backgroundError });

      fs.unlinkSync(cover.path);
      fs.unlinkSync(background.path);

      const serie = new Serie({
        title,
        description,
        cast,
        visible,
        cover: `${process.env.STORAGE}/${dataCover?.Key}`,
        background: `${process.env.STORAGE}/${dataBackground?.Key}`
      })

      const { data: serieData, error: serieError } = await connection.from("Series").insert(serie);

      if (serieError) return res.status(400).json({ message: 'Ops! Ocorreu um erro ao criar a série!', serieError });


      return res.status(200).redirect("/admin/serie/" + serie.getId());
    });

    this.routes.post("/serie/update", uploadImage.single('cover'), async (req: Request, res: Response) => {

      const { id, title, description, cast, visible } = req.body;
      const cover = req.file;

      if (!id || !title || !description || !cast || !visible) return res.status(400).json({ message: 'Ops! Você deve preencher todos os campos para continuar!' });
      if (cover) {
        // return res.status(400).json({ message: 'Ops! Você deve selecionar um arquivo para continuar!' });

        const dist = title.split(' ').map((word: string) => word[0].toUpperCase() + word.slice(1)).join("").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        fs.unlinkSync(cover.path);
      }

      const { data: serieFinded } = await connection.from("Series").select("*").eq("id", id).single();

      const serie = new Serie({
        ...serieFinded,
        title,
        description,
        cast,
        visible
      })

      const { data: serieData, error: serieError } = await connection.from("Series").update(serie).match({ id });

      if (serieError) return res.status(400).json({ message: 'Ops! Ocorreu um erro ao criar a série!', serieError });

      return res.status(200).redirect("/admin/serie/" + serie.getId());
    });

    this.routes.get("/serie/delete/:id", uploadImage.single('cover'), async (req: Request, res: Response) => {
      const { id } = req.params;

      const { data: serie, error } = await connection.from("Series").select("*, Seasons(*)").eq("id", id).single();

      if (error) return res.status(400).json({ message: 'Ops! Ocorreu um erro ao buscar a série!', error });

      const dist = serie.title.split(' ').map((word: string) => word[0].toUpperCase() + word.slice(1)).join("").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      const remove = await connection.storage.from("Semioflix")._removeEmptyFolders(`/series/${dist}`);

      console.log(remove)

      const { data: serieData, error: serieError } = await connection.from("Series").delete().eq("id", id);

      if (serieError) return res.status(400).json({ message: 'Ops! Ocorreu um erro ao deletar a série!', error });

      return res.status(200).redirect("/admin");
    });

    this.routes.post("/season/create", uploadVideos.fields([{ name: 'videos[]' }, { name: 'thumbs[]' }]), async (req: Request, res: Response) => {
      const id = req.body.serieId;
      const title = req.body['season-title'];

      if (!req.files) return res.status(400).json({ message: 'Ops! Você deve selecionar um arquivo para continuar!' });
      
      const thumbs = req.files['thumbs[]'];
      const videos = req.files['videos[]'];
      
      delete req.body.serieId;
      delete req.body['season-title'];

      const { data: serie } = await connection.from("Series").select("*, Seasons(id, title)").eq("id", id).single();

      if (!serie) return res.status(400).json({ message: 'Ops! A série não foi encontrada!' });

      const seasonsQuantity = serie.Seasons.length + 1;
      const url = serie.title.split(' ').map((word: string) => word[0].toUpperCase() + word.slice(1)).join("").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      videos.forEach(async (ep: any, index: number) => {
        const { data, error } = await connection.storage.from("Semioflix").upload(`/series/${url}/season-${seasonsQuantity}/episodes/ep-${index + 1}.${ep.mimetype.split('/')[1]}`, fs.readFileSync(ep.path), {
          cacheControl: '3600',
          upsert: false
        });

        if (!data || error) return res.status(400).json({ message: 'Ops! Ocorreu um erro ao fazer o upload do vídeo!', error });

        fs.unlinkSync(ep.path);
      })

      thumbs.forEach(async (thumb: any, index: number) => {
        const { data, error } = await connection.storage.from("Semioflix").upload(`/series/${url}/season-${seasonsQuantity}/thumbs/ep-${index + 1}.${thumb.mimetype.split('/')[1]}`, fs.readFileSync(thumb.path), {
          cacheControl: '3600',
          upsert: false
        });

        if (!data || error) return res.status(400).json({ message: 'Ops! Ocorreu um erro ao fazer o upload do vídeo!', error });

        fs.unlinkSync(thumb.path);
      })

      let season = new Season({
        serieId: id,
        title,
        episodes: Array.from({ length: Object.keys(req.body).length / 3 }, (_, index) => {
          let ep = new Episode({
            title: req.body["ep-" + (index + 1) + "-title"],
            description: req.body["ep-" + (index + 1) + "-description"],
            url: process.env.STORAGE + "/Semioflix/series/" + url + "/season-" + seasonsQuantity + "/episodes/ep-" + (index + 1) + "." + videos[index].mimetype.split('/')[1],
            visible: req.body["ep-" + (index + 1) + "-visible"],
            thumbnail: process.env.STORAGE + "/Semioflix/series/" + url + "/season-" + seasonsQuantity + "/thumbs/ep-" + (index + 1) + "." + thumbs[index].mimetype.split('/')[1]
          })

          return ep;

        }).filter((e: any) => e !== null)
      })

      const { data: seasonData, error: seasonError } = await connection.from("Seasons").insert(season);

      if (seasonError) return res.status(400).json({ message: 'Ops! Ocorreu um erro ao criar a temporada!', seasonError });

      return res.status(200).redirect('/serie/' + id);
    });
  }
}

export default new adminRoutes().routes;