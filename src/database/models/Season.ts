import { v4 as uuid } from "uuid";
import { Episode } from "./Episode";

interface ISeason {
  readonly id?: string;
  title: string;
  episodes: Episode[];
  readonly serieId: string;
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Season implements ISeason {
  readonly id: string;
  title: string;
  episodes: Episode[];
  readonly serieId: string;
  readonly createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    title,
    episodes,
    serieId,
    createdAt,
    updatedAt,
  }: ISeason) {
    this.id = id || uuid();
    this.title = title;
    this.episodes = episodes || [];
    this.serieId = serieId;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId = (): string => this.id;

  public getTitle = (): string => this.title;
  public setTitle = (title: string): string => this.title = title;

  public getEpisodes = (): Episode[] => this.episodes;
  public setEpisodes = (episodes: Episode[]): Episode[] => this.episodes = episodes;
  public addEpisode = (episode: Episode) => this.episodes.push(episode);
  public removeEpisode = (episodeId: string) => this.episodes = this.episodes.filter(episode => episode.getId() !== episodeId);
  public updateEpisode = (episodeId: string, episode: Episode) => {
    const episodeIndex = this.episodes.findIndex(episode => new Episode(episode).getId() === episodeId);
    this.episodes[episodeIndex] = episode;
  };
  
  public getSerieId = (): string => this.serieId;
  
  public getCreatedAt = (): Date => this.createdAt;

  public viewIncrement = (episodeId: string) => {
    const episodeIndex = this.episodes.findIndex(episode => new Episode(episode).getId() === episodeId);

    const episode = new Episode(this.episodes[episodeIndex]);
    episode.setViews(Number(episode.getViews()) + 1);
    this.episodes[episodeIndex] = episode;
    
    this.setUpdatedAt();
  };

  public getUpdatedAt = (): Date => this.updatedAt;
  public setUpdatedAt = (): Date => this.updatedAt = new Date();
}

export { Season };
