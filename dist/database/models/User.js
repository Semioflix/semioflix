"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _uuid = require('uuid');

















class User  {
  
  
  
  
  
  
  
  
  
  
  
  
  

  constructor({
    id,
    userId,
    avatar,
    username,
    name,
    email,
    isAdmin,
    isSuper,
    isActive,
    accesses,
    network,
    createdAt,
    updatedAt,
  }) {;User.prototype.__init.call(this);User.prototype.__init2.call(this);User.prototype.__init3.call(this);User.prototype.__init4.call(this);User.prototype.__init5.call(this);User.prototype.__init6.call(this);User.prototype.__init7.call(this);User.prototype.__init8.call(this);User.prototype.__init9.call(this);User.prototype.__init10.call(this);User.prototype.__init11.call(this);User.prototype.__init12.call(this);User.prototype.__init13.call(this);User.prototype.__init14.call(this);User.prototype.__init15.call(this);User.prototype.__init16.call(this);User.prototype.__init17.call(this);User.prototype.__init18.call(this);User.prototype.__init19.call(this);User.prototype.__init20.call(this);User.prototype.__init21.call(this);User.prototype.__init22.call(this);User.prototype.__init23.call(this);User.prototype.__init24.call(this);User.prototype.__init25.call(this);User.prototype.__init26.call(this);User.prototype.__init27.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.userId = userId;
    this.avatar =
      avatar ||
      "https://yizosayzoigeczzlmyae.supabase.co/storage/v1/object/public/Semioflix/avatars/default.png?t=2023-05-29T12%3A33%3A51.080Z";
    this.username = username;
    this.name = name;
    this.email = email;
    this.isAdmin = isAdmin || false;
    this.isSuper = isSuper || false;
    this.isActive = isActive || false;
    this.accesses = accesses || [];
    this.network = network || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init() {this.getId = () => this.id}

   __init2() {this.getUserId = () => this.userId}

   __init3() {this.getUsername = () => this.username}
   __init4() {this.setUsername = (username) => {
    this.username = username;
    this.setUpdatedAt();
  }}

   __init5() {this.getAvatar = () => this.avatar}
   __init6() {this.setAvatar = (avatar) => {
    this.avatar = avatar;
    this.setUpdatedAt();
  }}

   __init7() {this.getName = () => this.name}
   __init8() {this.setName = (name) => {
    this.name = name;
    this.setUpdatedAt();
  }}

   __init9() {this.getEmail = () => this.email}
   __init10() {this.setEmail = (email) => {
    this.email = email;
    this.setUpdatedAt();
  }}

   __init11() {this.getAdmin = () => this.isAdmin}
   __init12() {this.setAdmin = (admin) => {
    this.isAdmin = admin;
    this.setUpdatedAt();
  }}

   __init13() {this.getSuper = () => this.isSuper}
   __init14() {this.setSuper = (superUser) => {
    this.isSuper = superUser;
    this.setUpdatedAt();
  }}

   __init15() {this.getActive = () => this.isActive}
   __init16() {this.setActive = (active) => {
    this.isActive = active;
    this.setUpdatedAt();
  }}

   __init17() {this.getAccesses = () => this.accesses}
   __init18() {this.setAccesses = (accesses) => {
    if (this.accesses.length > 9) this.accesses = this.accesses.slice(1, 10);
    if (accesses) this.accesses.push(accesses);
    this.setUpdatedAt();
  }}
   __init19() {this.setExitAccesses = (accesses) => {
    this.accesses = this.accesses.map((item) => {
      if (accesses && item.id === accesses.id) {
        item.exit = new Date();
        item.duration = item.calculateDuration();
      }
      return item;
    });

    this.setUpdatedAt();
  }}

   __init20() {this.getNetwork = () => this.network}
   __init21() {this.setNetwork = (network) => {
    this.network.push(network);
    this.setUpdatedAt();
  }}
   __init22() {this.removeNetwork = (network) => {
    this.network = this.network.filter(
      (item) => item.id !== network.id
    );

    this.setUpdatedAt();
  }}

   __init23() {this.getCreatedAt = () => this.createdAt}

   __init24() {this.getUpdatedAt = () => this.updatedAt}
   __init25() {this.setUpdatedAt = () => {
    this.updatedAt = new Date();
  }}

   __init26() {this.getFirstName = () => this.name.split(" ")[0]}

   __init27() {this.update = (user) => {
    this.setAvatar(user.avatar || "/public/images/avatars/default.png");
    this.setUsername(user.username);
    this.setName(user.name);
    this.setEmail(user.email);
    this.setAdmin(user.isAdmin || false);
  }}
}
















class Accesses  {
  
  
  





  
  
  
  

  constructor({
    id,
    date,
    location,
    exit,
    machine,
    browser,
    duration,
  }) {;Accesses.prototype.__init28.call(this);Accesses.prototype.__init29.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.date = date || new Date();
    this.location = {
      country: _optionalChain([location, 'optionalAccess', _ => _.country]) || "undefined",
      state: _optionalChain([location, 'optionalAccess', _2 => _2.state]) || "undefined",
      city: _optionalChain([location, 'optionalAccess', _3 => _3.city]) || "undefined",
      ip: _optionalChain([location, 'optionalAccess', _4 => _4.ip]) || "undefined",
    };
    this.machine = machine || "undefined";
    this.browser = browser || "undefined";
    this.exit = exit || null;
    this.duration = this.calculateDuration();
  }

   __init28() {this.create = () => {
    return new Accesses({
      id: this.id,
      date: this.date,
      location: this.location,
      machine: this.machine,
      browser: this.browser,
      exit: this.exit,
      duration: this.duration,
    });
  }}

   __init29() {this.calculateDuration = () => {
    if (!this.exit) return "0h 0min 0s";
    const duration = this.exit.getTime() - this.date.getTime();
    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);

    if (hours > 0) return `${hours}h ${minutes}min ${seconds}s`;
    if (minutes > 0) return `${minutes}min ${seconds}s`;
    return `${seconds}s`;
  }}
}

class Network {
  
  
  
  
  
  

  constructor({
    id,
    url,
    visualization,
    visits,
    createdAt,
    updatedAt,
  }






) {;Network.prototype.__init30.call(this);Network.prototype.__init31.call(this);Network.prototype.__init32.call(this);Network.prototype.__init33.call(this);Network.prototype.__init34.call(this);Network.prototype.__init35.call(this);Network.prototype.__init36.call(this);Network.prototype.__init37.call(this);Network.prototype.__init38.call(this);Network.prototype.__init39.call(this);Network.prototype.__init40.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.url = url;
    this.visualization = visualization || true;
    this.visits = visits || 0;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init30() {this.create = () => {
    return new Network({
      id: this.id,
      url: this.url,
      visualization: this.visualization,
      visits: this.visits,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }}

   __init31() {this.getId = () => this.id}

   __init32() {this.getUrl = () => this.url}
   __init33() {this.setUrl = (url) => {
    this.url = url;
    this.setUpdatedAt();
  }}

   __init34() {this.getVisualization = () => this.visualization || true}
   __init35() {this.setVisualization = (visualization) => {
    this.visualization = visualization;
    this.setUpdatedAt();
  }}

   __init36() {this.getVisits = () => this.visits || 0}
   __init37() {this.setVisits = () => {
    this.visits = this.getVisits() + 1;
    this.setUpdatedAt();
  }}

   __init38() {this.getCreatedAt = () => this.createdAt}

   __init39() {this.getUpdatedAt = () => this.updatedAt}
   __init40() {this.setUpdatedAt = () => {
    this.updatedAt = new Date();
  }}
}

class Users {
  

  constructor(users) {;Users.prototype.__init41.call(this);Users.prototype.__init42.call(this);Users.prototype.__init43.call(this);Users.prototype.__init44.call(this);
    this.users = users;
  }

   __init41() {this.getUsers = () => this.users}

   __init42() {this.getUser = (id) =>
    this.users.find((user) => user.getId() === id) || null}

   __init43() {this.getUserByUsername = (username) =>
    this.users.find((user) => user.getUsername() === username) || null}

   __init44() {this.getUserByEmail = (email) =>
    this.users.find((user) => user.getEmail() === email) || null}
}

exports.User = User; exports.Users = Users; exports.Accesses = Accesses;
