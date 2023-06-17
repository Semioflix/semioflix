import { v4 as uuid } from 'uuid';

interface IEpisode {
  readonly id?: string;
  title: string;
  description: string;
  url: string;
  likes?: number;
  views?: number;
  visible?: boolean;
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Episode {
  readonly id: string;
  title: string;
  description: string;
  url: string;
  likes?: number;
  views?: number;
  visible?: boolean;
  readonly createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    title,
    description,
    url,
    likes,
    views,
    visible,
    createdAt,
    updatedAt,
  }: IEpisode) {
    this.id = id || uuid();
    this.title = title;
    this.description = description;
    this.url = url;
    this.likes = likes || 0;
    this.views = views || 0;
    this.visible = visible || true;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId = (): string => this.id;

  public getTitle = (): string => this.title;
  public setTitle = (title: string): string => {
    this.title = title;
    this.setUpdatedAt();
    return this.title;
  }

  public getDescription = (): string => this.description;
  public setDescription = (description: string): string => {
    this.description = description;
    this.setUpdatedAt();
    return this.description;
  }

  public getUrl = (): string => this.url;
  public setUrl = (url: string): string => {
    this.url = url;
    this.setUpdatedAt();
    return this.url;
  }

  public getLikes = (): number => this.likes || 0;
  public setLikes = (likes: number): number => this.likes = likes;
  public addLike = (): number => this.likes ? this.likes++ : this.likes = 1;

  public getViews = (): number => this.views || 0;
  public setViews = (views: number): number => this.views = views;
  public addView = (): number => this.views ? this.views++ : this.views = 1;

  public getVisible = (): boolean => this.visible || true;
  public setVisible = (visible: boolean): boolean => {
    this.visible = visible;
    this.setUpdatedAt();
    return this.visible;
  }

  public getCreatedAt = (): Date => this.createdAt;

  public getUpdatedAt = (): Date => this.updatedAt;
  public setUpdatedAt = (): Date => this.updatedAt = new Date();
}

export { Episode };