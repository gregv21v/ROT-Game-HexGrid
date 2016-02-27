"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getCornerPointy = exports.getCornerPointy = getCornerGen(30);
var getCornerFlat = exports.getCornerFlat = getCornerGen(0);
var drawHexPointy = exports.drawHexPointy = drawHexGen(getCornerPointy);
var drawHexFlat = exports.drawHexFlat = drawHexGen(getCornerFlat);

function getCornerGen(degreesOffset) {
    return function getCorner(x, y, size, i) {
        var degrees = 60 * i + degreesOffset;
        var radians = Math.PI / 180 * degrees;
        return [x + size * Math.cos(radians), y + size * Math.sin(radians)];
    };
}

function drawHexGen(corner) {
    return function drawHex(context, x, y, size) {
        context.beginPath();
        context.moveTo.apply(context, corner(x, y, size, 0));
        context.lineTo.apply(context, corner(x, y, size, 1));
        context.lineTo.apply(context, corner(x, y, size, 2));
        context.lineTo.apply(context, corner(x, y, size, 3));
        context.lineTo.apply(context, corner(x, y, size, 4));
        context.lineTo.apply(context, corner(x, y, size, 5));
        context.closePath();
        context.stroke();
    };
}