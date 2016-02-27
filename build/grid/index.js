'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           Borrowed from https://github.com/Bockit/hex.git
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         */


exports.gridPointy = gridPointy;
exports.gridFlat = gridFlat;
exports.pointyHeight = pointyHeight;
exports.pointyWidth = pointyWidth;
exports.flatWidth = flatWidth;
exports.flatHeight = flatHeight;
exports.pointyVerticalDistance = pointyVerticalDistance;
exports.flatHorizontalDistance = flatHorizontalDistance;

var _hexStorage = require('@bockit/hex-storage');

var _hexStorage2 = _interopRequireDefault(_hexStorage);

var _hexCoordinates = require('@bockit/hex-coordinates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function gridPointy(_ref) {
    var size = _ref.size;
    var width = _ref.width;
    var height = _ref.height;

    var grid = new _hexStorage2.default();

    var numRows = Math.ceil(height / pointyVerticalDistance(size)) + 1;
    var numCols = Math.ceil(width / pointyWidth(size)) + 1;

    var cumulativeHeight = -size;
    for (var row = 0; row < numRows; row++) {
        if (cumulativeHeight >= height) continue;
        var cumulativeWidth = row % 2 ? 0 : -(pointyWidth(size) / 2);
        for (var col = 0; col < numCols; col++) {
            if (cumulativeWidth >= width) continue;
            var q = col - Math.floor(row / 2);
            var r = row;

            var _hexToPixelPointy = (0, _hexCoordinates.hexToPixelPointy)(q, r, size);

            var _hexToPixelPointy2 = _slicedToArray(_hexToPixelPointy, 2);

            var x = _hexToPixelPointy2[0];
            var y = _hexToPixelPointy2[1];

            grid.set(q, r, { q: q, r: r, x: x, y: y, size: size });
            cumulativeWidth += pointyWidth(size);
        }
        cumulativeHeight += pointyVerticalDistance(size);
    }

    return grid;
}

function gridFlat(_ref2) {
    var size = _ref2.size;
    var width = _ref2.width;
    var height = _ref2.height;

    var grid = new _hexStorage2.default();

    var numRows = Math.ceil(height / flatHeight(size)) + 1;
    var numCols = Math.ceil(width / flatHorizontalDistance(size)) + 1;

    var cumulativeWidth = -size;
    for (var col = 0; col < numCols; col++) {
        if (cumulativeWidth >= width) continue;
        var cumulativeHeight = col % 2 ? 0 : -(flatHeight(size) / 2);
        for (var row = 0; row < numRows; row++) {
            if (cumulativeHeight >= height) continue;
            var q = col;
            var r = row - Math.floor(col / 2);

            var _hexToPixelFlat = (0, _hexCoordinates.hexToPixelFlat)(q, r, size);

            var _hexToPixelFlat2 = _slicedToArray(_hexToPixelFlat, 2);

            var x = _hexToPixelFlat2[0];
            var y = _hexToPixelFlat2[1];

            grid.set(q, r, { q: q, r: r, x: x, y: y, size: size });
            cumulativeHeight += flatHeight(size);
        }
        cumulativeWidth += flatHorizontalDistance(size);
    }

    return grid;
}

function pointyHeight(size) {
    return size * 2;
}

function pointyWidth(size) {
    return Math.sqrt(3) / 2 * pointyHeight(size);
}

function flatWidth(size) {
    return size * 2;
}

function flatHeight(size) {
    return Math.sqrt(3) / 2 * flatWidth(size);
}

function pointyVerticalDistance(size) {
    return pointyHeight(size) * 3 / 4;
}

function flatHorizontalDistance(size) {
    return flatWidth(size) * 3 / 4;
}