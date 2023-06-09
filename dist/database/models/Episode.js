"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid = require('uuid');













class Episode {
  
  
  
  
  
  
  
  
  

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
  }) {;Episode.prototype.__init.call(this);Episode.prototype.__init2.call(this);Episode.prototype.__init3.call(this);Episode.prototype.__init4.call(this);Episode.prototype.__init5.call(this);Episode.prototype.__init6.call(this);Episode.prototype.__init7.call(this);Episode.prototype.__init8.call(this);Episode.prototype.__init9.call(this);Episode.prototype.__init10.call(this);Episode.prototype.__init11.call(this);Episode.prototype.__init12.call(this);Episode.prototype.__init13.call(this);Episode.prototype.__init14.call(this);Episode.prototype.__init15.call(this);Episode.prototype.__init16.call(this);Episode.prototype.__init17.call(this);Episode.prototype.__init18.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.description = description;
    this.url = url;
    this.likes = likes || 0;
    this.views = views || 0;
    this.visible = visible || true;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init() {this.getId = () => this.id}

   __init2() {this.getTitle = () => this.title}
   __init3() {this.setTitle = (title) => {
    this.title = title;
    this.setUpdatedAt();
    return this.title;
  }}

   __init4() {this.getDescription = () => this.description}
   __init5() {this.setDescription = (description) => {
    this.description = description;
    this.setUpdatedAt();
    return this.description;
  }}

   __init6() {this.getUrl = () => this.url}
   __init7() {this.setUrl = (url) => {
    this.url = url;
    this.setUpdatedAt();
    return this.url;
  }}

   __init8() {this.getLikes = () => this.likes || 0}
   __init9() {this.setLikes = (likes) => this.likes = likes}
   __init10() {this.addLike = () => this.likes ? this.likes++ : this.likes = 1}

   __init11() {this.getViews = () => this.views || 0}
   __init12() {this.setViews = (views) => this.views = views}
   __init13() {this.addView = () => this.views ? this.views++ : this.views = 1}

   __init14() {this.getVisible = () => this.visible || true}
   __init15() {this.setVisible = (visible) => {
    this.visible = visible;
    this.setUpdatedAt();
    return this.visible;
  }}
  
   __init16() {this.getCreatedAt = () => this.createdAt}

   __init17() {this.getUpdatedAt = () => this.updatedAt}
   __init18() {this.setUpdatedAt = () => this.updatedAt = new Date()}
}

exports.Episode = Episode;