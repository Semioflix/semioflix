"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid = require('uuid');
var _Episode = require('./Episode');










class Season  {
  
  
  
  
  
  

  constructor({
    id,
    title,
    episodes,
    serieId,
    createdAt,
    updatedAt,
  }) {;Season.prototype.__init.call(this);Season.prototype.__init2.call(this);Season.prototype.__init3.call(this);Season.prototype.__init4.call(this);Season.prototype.__init5.call(this);Season.prototype.__init6.call(this);Season.prototype.__init7.call(this);Season.prototype.__init8.call(this);Season.prototype.__init9.call(this);Season.prototype.__init10.call(this);Season.prototype.__init11.call(this);Season.prototype.__init12.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.episodes = episodes || [];
    this.serieId = serieId;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init() {this.getId = () => this.id}

   __init2() {this.getTitle = () => this.title}
   __init3() {this.setTitle = (title) => this.title = title}

   __init4() {this.getEpisodes = () => this.episodes}
   __init5() {this.setEpisodes = (episodes) => this.episodes = episodes}
   __init6() {this.addEpisode = (episode) => this.episodes.push(episode)}
   __init7() {this.removeEpisode = (episodeId) => this.episodes = this.episodes.filter(episode => episode.getId() !== episodeId)}
   __init8() {this.updateEpisode = (episodeId, episode) => {
    const episodeIndex = this.episodes.findIndex(episode => new (0, _Episode.Episode)(episode).getId() === episodeId);
    this.episodes[episodeIndex] = episode;
  }}
  
   __init9() {this.getSerieId = () => this.serieId}
  
   __init10() {this.getCreatedAt = () => this.createdAt}

   __init11() {this.getUpdatedAt = () => this.updatedAt}
   __init12() {this.setUpdatedAt = () => this.updatedAt = new Date()}
}

exports.Season = Season;
