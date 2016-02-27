'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pixelToHexPointy = pixelToHexPointy;
exports.pixelToHexFlat = pixelToHexFlat;
exports.hexToPixelPointy = hexToPixelPointy;
exports.hexToPixelFlat = hexToPixelFlat;

var _hexRound = require('@bockit/hex-round');

var _hexRound2 = _interopRequireDefault(_hexRound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pixelToHexPointy(x, y, size) {
    var q = (x * Math.sqrt(3) / 3 - y / 3) / size;
    var r = y * (2 / 3) / size;
    return (0, _hexRound2.default)(q, r);
} /*
    Borrowed from https://github.com/Bockit/hex.git
  */


function pixelToHexFlat(x, y, size) {
    var q = x * (2 / 3) / size;
    var r = (-x / 3 + Math.sqrt(3) / 3 * y) / size;
    return (0, _hexRound2.default)(q, r);
}

function hexToPixelPointy(q, r, size) {
    var x = size * Math.sqrt(3) * (q + r / 2);
    var y = size * (3 / 2) * r;
    return [x, y];
}

function hexToPixelFlat(q, r, size) {
    var x = size * (3 / 2) * q;
    var y = size * Math.sqrt(3) * (r + q / 2);
    return [x, y];
}