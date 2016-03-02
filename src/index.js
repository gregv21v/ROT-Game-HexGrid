import $ from 'jquery'
import {Map} from "./map.js"
import {MapCreationAnimator} from "./mapCreationAnimator.js"


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
    {x:450, y:400} // center
  );

  var animator = new MapCreationAnimator(testMap);

  animator.animate(600);
});
