"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _dns = require('dns'); var _dns2 = _interopRequireDefault(_dns);

var _connection = require('./connection');
var _App = require('../App'); var _App2 = _interopRequireDefault(_App);
var _User = require('./models/User');

function authenticate() {
  return {
    auth: (req, res, next) => {
      authenticate().connecting(req, res, () => {
        const authenticated = _connection.connection.auth.session() ? true : false;

        if (authenticated) return next();
        return res.status(401).redirect('/admin/signin');
      });
    },
    onlyAdmins: (req, res, next) => {
      authenticate().auth(req, res, async () => {
        const { data, error } = await _connection.connection
          .from("Users")
          .select("*")
          .match({ id: _App2.default.get("user").getId() });

        if (error) return res.status(401).redirect('/admin/signin');

        const user = new (0, _User.User)(data[0]);

        if (user.getAdmin()) return next();
        return res
          .status(401)
          .json({
            message:
              "Ops! Você não pode acessar está funcionalidade, pois você não é um adiminstrador!",
          });
      });
    },
    connecting: (req, res, next) => {
      _dns2.default.lookup('google.com', (err) => {
        if (err && err.code === 'ENOTFOUND') return res.status(501).json({ message: 'Ops! Você deve conectar-se com à internet para continuar!' });
        return next();
      });
    },
    uploadController: (req, res, next) => {
      const { file } = req;

      if (!file) return res.status(400).json({ message: 'Ops! Você deve selecionar um arquivo para continuar!' });
      return next();
    }
  }
}

exports.authenticate = authenticate;