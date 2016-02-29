export class Node {

  // place a node at the corner of each hex
  constructor(context, x, y, radius) {
    this.context = context;
    this.label = "";

    // used for coloring the nodes
    this.labelColor = "Black";
    this.fill = "white";
    this.stroke = "black";

    this.center = {x: x, y: y};
    this.radius = radius;
  }


  draw() {
    this.context.beginPath()
    this.context.arc(this.center.x, this.center.y, this.radius, 0, 2.0 * Math.PI);
    this.context.closePath();
    this.context.fillStyle = this.fill;
    this.context.strokeStyle = this.stroke;
    this.context.fill();
    this.context.stroke();

    // add the label
    this.context.textAlign = "center"
    this.context.font = "5px Arial"
    this.context.fillStyle = this.labelColor
    this.context.fillText(this.label, this.center.x, this.center.y)
  }




}
