"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid = require('uuid');














class Serie  {
  
  
  
  
  
  
  
  
  
  

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
  }) {;Serie.prototype.__init.call(this);Serie.prototype.__init2.call(this);Serie.prototype.__init3.call(this);Serie.prototype.__init4.call(this);Serie.prototype.__init5.call(this);Serie.prototype.__init6.call(this);Serie.prototype.__init7.call(this);Serie.prototype.__init8.call(this);Serie.prototype.__init9.call(this);Serie.prototype.__init10.call(this);Serie.prototype.__init11.call(this);Serie.prototype.__init12.call(this);Serie.prototype.__init13.call(this);Serie.prototype.__init14.call(this);Serie.prototype.__init15.call(this);Serie.prototype.__init16.call(this);Serie.prototype.__init17.call(this);Serie.prototype.__init18.call(this);
    this.id = id || _uuid.v4.call(void 0, );
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

   __init() {this.getId = () => this.id}

   __init2() {this.getTitle = () => this.title}
   __init3() {this.setTitle = (title) => {
    this.title = title;
    this.setUpdatedAt();
  }}

   __init4() {this.getDescription = () => this.description}
   __init5() {this.setDescription = (description) => {
    this.description = description;
    this.setUpdatedAt();
  }}

   __init6() {this.getCast = () => this.cast || ""}
   __init7() {this.setCast = (cast) => {
    this.cast = cast;
    this.setUpdatedAt();
  }}

   __init8() {this.getCover = () => this.cover}
   __init9() {this.setCover = (cover) => {
    this.cover = cover;
    this.setUpdatedAt();
  }}

   __init10() {this.getVisible = () => this.visible || true}
   __init11() {this.setVisible = (visible) => {
    this.visible = visible;
    this.setUpdatedAt();
  }}

   __init12() {this.getLikes = () => this.likes || 0}
   __init13() {this.setLikes = (likes) => this.likes = likes}

   __init14() {this.getViews = () => this.views || 0}
   __init15() {this.setViews = (views) => this.views = views}

   __init16() {this.getCreatedAt = () => this.createdAt}

   __init17() {this.getUpdatedAt = () => this.updatedAt}
   __init18() {this.setUpdatedAt = () => this.updatedAt = new Date()}
}

exports.Serie = Serie;
