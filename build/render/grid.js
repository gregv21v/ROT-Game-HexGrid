'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.drawGridPointy = drawGridPointy;
exports.drawGridFlat = drawGridFlat;

var _hex = require('./hex');

var _hexCoordinates = require('@bockit/hex-coordinates');

/*
  Borrowed from https://github.com/Bockit/hex.git
*/

function drawGridPointy(context, grid) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = grid[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _step.value;
            var x = _step$value.x;
            var y = _step$value.y;
            var size = _step$value.size;

            (0, _hex.drawHexPointy)(context, x, y, size);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

function drawGridFlat(context, grid) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = grid[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _step2$value = _step2.value;
            var x = _step2$value.x;
            var y = _step2$value.y;
            var size = _step2$value.size;

            (0, _hex.drawHexFlat)(context, x, y, size);
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }
}