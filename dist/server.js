"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _App = require('./App'); var _App2 = _interopRequireDefault(_App);
require('dotenv/config');

const PORT = process.env.PORT || 3000;

_App2.default.listen(PORT, () => {
  console.clear();
  console.log(`Server running on port ${PORT}`)
});