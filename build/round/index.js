"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.hexRoundAxial = hexRoundAxial;
exports.hexRoundCube = hexRoundCube;
/*
  Borrowed from https://github.com/Bockit/hex.git
*/
function hexRoundAxial(q, r) {
    var _hexRoundCube = hexRoundCube(q, -q - r, r);

    var _hexRoundCube2 = _slicedToArray(_hexRoundCube, 3);

    var q = _hexRoundCube2[0];
    var s = _hexRoundCube2[1];
    var r = _hexRoundCube2[2];

    return [q, r];
}

function hexRoundCube(x, y, z) {
    var rx = Math.round(x);
    var ry = Math.round(y);
    var rz = Math.round(z);

    var dx = Math.abs(rx - x);
    var dy = Math.abs(ry - y);
    var dz = Math.abs(rz - z);

    if (dx > dy && dx > dz) {
        rx = -ry - rz;
    } else if (dy > dz) {
        ry = -rx - rz;
    } else {
        rz = -rx - ry;
    }

    return [rx, ry, rz];
}