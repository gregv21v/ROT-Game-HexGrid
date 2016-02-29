import $ from 'jquery'
import {Map} from "./map.js"


$(document).ready(function() {
  var canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1000;
  document.body.appendChild(canvas);

  var context = canvas.getContext("2d");


  var testMap = new Map(
    context,
    5, // the radius of the hex grid in hexes
    10, // node radius
    30, // hex size
    {x:400, y:400} // center
  );

  testMap.animateNodePlacement();
});
