'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _hex = require('./render/hex');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _jquery2.default)(document).ready(function () {
  var canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1000;
  document.body.appendChild(canvas);

  var context = canvas.getContext("2d");

  (0, _hex.drawHexPointy)(context, 100, 100, 20);
  (0, _hex.drawHexFlat)(context, 140, 100, 20);
});