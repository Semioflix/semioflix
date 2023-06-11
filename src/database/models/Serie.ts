import { v4 as uuid } from "uuid";

interface ISerie {
  readonly id?: string;
  title: string;
  description: string;
  cast?: string;
  cover: string;
  visible?: boolean;
  likes?: number;
  views?: number;
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Serie implements ISerie {
  readonly id: string;
  title: string;
  description: string;
  cast?: string;
  cover: string;
  visible?: boolean;
  likes?: number;
  views?: number;
  readonly createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    title,
    description,
    cast,
    cover,
    visible,
    likes,
    views,
    createdAt,
    updatedAt,
  }: ISerie) {
    this.id = id || uuid();
    this.title = title;
    this.description = description;
    this.cast = cast;
    this.cover = cover;
    this.visible = visible || true;
    this.likes = likes || 0;
    this.views = views || 0;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId = (): string => this.id;

  public getTitle = (): string => this.title;
  public setTitle = (title: string): void => {
    this.title = title;
    this.setUpdatedAt();
  };

  public getDescription = (): string => this.description;
  public setDescription = (description: string): void => {
    this.description = description;
    this.setUpdatedAt();
  };

  public getCast = (): string => this.cast || "";
  public setCast = (cast: string): void => {
    this.cast = cast;
    this.setUpdatedAt();
  };

  public getCover = (): string => this.cover;
  public setCover = (cover: string): void => {
    this.cover = cover;
    this.setUpdatedAt();
  };

  public getVisible = (): boolean => this.visible || true;
  public setVisible = (visible: boolean): void => {
    this.visible = visible;
    this.setUpdatedAt();
  };

  public getLikes = (): number => this.likes || 0;
  public setLikes = (likes: number): number => this.likes = likes;

  public getViews = (): number => this.views || 0;
  public setViews = (views: number): number => this.views = views;

  public getCreatedAt = (): Date => this.createdAt;

  public getUpdatedAt = (): Date => this.updatedAt;
  public setUpdatedAt = (): Date => this.updatedAt = new Date();
}

export { Serie };
