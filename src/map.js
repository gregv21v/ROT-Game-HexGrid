import {Hex} from "./hex.js"
import {Node} from "./node.js"
/*
  A hexagonal shapped hex map with nodes surrounding
  each hex.


  TODO:
*/


export class Map {

  /*
    Radius: radius of the grid
    centerHex: the Hex in the center of the grid
  */
  constructor(context, radius, nodeRadius, hexSize, center) {
    this.context = context;

    this.hexes = {};
    this.nodes = [];
    this.radius = radius;
    this.center = center;

    this.nodeRadius = nodeRadius;
    this.hexSize = hexSize;


    // build the hex grid (from redblog hex grids)
    this.hexOrdering = []; // keeps track of the order in which each hex is added
    this.generateGrid();


    // color center hex
    this.get(0, 0).fill = "green";

    // Test getNeighbors function
    /*
    var neighbors = this.getNeighbors(1, 1);

    for(var i = 0; i < neighbors.length; i++) {
      this.get(neighbors[i].q, neighbors[i].r).fill = "orange";
    }
    */

    // Test adding nodes
    this.addNodes(0, 0, 0);

    console.log(this.hexes);



    // add nodes to all the hexes starting at the center hex

  }




  /*
    Set the hexagon at the axial position q, r
  */
  set(q, r, hex) {
    this.hexes[q + "," + r] = hex;
  }


  // TODO: add another set function with two parameters if possible

  /*
    Gets the hexagon at the axial position q, r
  */
  get(q, r) {
    return this.hexes[q + "," + r];
  }

  /*
    Determines if a hex exists at q, r
  */
  exists(q, r) {
    return this.hexes[q + "," + r] != null;
  }

  // TODO: add another get function with one parameters if possible

  /*
    Get the neighbors of the given hex at coordinate (q, r)
  */
  getNeighbors(q, r) {
    var neighbors = [];
    var directions = [
      {q: 0, r: -1},
      {q: 1, r: -1},
      {q: 1, r: 0},
      {q: 0, r: 1},
      {q: -1, r: 1},
      {q: -1, r: 0}
    ];

    for(var i = 0; i < directions.length; i++) {
      var newNeighbor = {
        q: q + directions[i].q,
        r: r + directions[i].r,
        index: i
      };
      if(this.get(newNeighbor.q, newNeighbor.r)) {
        neighbors.push(newNeighbor);
      }
    }
    return neighbors;
  }

  /*
    Generates the hex grid
  */
  generateGrid() {
    for (var q = -this.radius; q <= this.radius; q++) {
        var r1 = Math.max(-this.radius, -q - this.radius);
        var r2 = Math.min(this.radius, -q + this.radius);
        for (var r = r1; r <= r2; r++) {
          var screenCoord = this.hexToPixelFlat(q, r, this.hexSize);
          var newHex = new Hex(this.context, this.center.x + screenCoord.x, this.center.y + screenCoord.y, this.hexSize);
          newHex.label = q + "," + r;
          this.set(q, r, newHex);
          this.hexOrdering.push({q: q, r: r}) // for keeping track of how hexes are placed
        }
    }
  }

  /*
    Adds the surrounding nodes to the given hex
  */
  addNodes(q, r, lastId) {
    var newNodes = [];
    var lastId = lastId;

    // fill in any nodes neighboring to this one
    var neighbors = this.getNeighbors(q, r);

    // Fill in any existing nodes from neighbors that have already been visited.
    for(var i = 0; i < neighbors.length; i++) {
      if(this.get(neighbors[i].q, neighbors[i].r).visited) {
        this.get(q, r).setNodeId(this.get(neighbors[i].q, neighbors[i].r).getNodeId((neighbors[i].index + 1) % 6), (neighbors[i].index + 4) % 6)
        this.get(q, r).setNodeId(this.get(neighbors[i].q, neighbors[i].r).getNodeId((neighbors[i].index + 2) % 6), (neighbors[i].index + 5) % 6)
      }
    }



    // add nodes to current hex
    for(var i = 0; i < 6; i++) {
      if(this.get(q, r).getNodeId(i) == -1) {
        this.get(q, r).setNodeId(lastId, i);
        var corner = this.get(q, r).corner(i);
        var newNode = new Node(this.context, corner.x, corner.y, this.nodeRadius);
        newNode.label = lastId + "";
        this.nodes.push(newNode);
        lastId += 1;
      }
    }
    this.get(q, r).visited = true;

    // Get nodes from the neighbors of this hex that haven't been visited
    for(var i = 0; i < neighbors.length; i++) {
      if(!this.get(neighbors[i].q, neighbors[i].r).visited) {
        this.addNodes(neighbors[i].q, neighbors[i].r, lastId)
      }
    }
  }


  /*
    Draws the entire map.
  */
  draw() {
    for(var hex in this.hexes) {
      this.hexes[hex].draw();
    }

    for(var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].draw();
    }
  }








  /*
    Converts a hex to a pixel for the pointy hex layout.
    Taken from https://github.com/Bockit/hex
  */
  hexToPixelPointy (q, r, size) {
    let x = size * Math.sqrt(3) * (q + r / 2)
    let y = size * (3 / 2) * r
    return {x: x, y: y};
  }

  /*
    Converts a hex to a pixel for the flat hex layout.
    Taken from https://github.com/Bockit/hex
  */
  hexToPixelFlat (q, r, size) {
    let x = size * (3 / 2) * q
    let y = size * Math.sqrt(3) * (r + q / 2)
    return {x: x, y: y};
  }


}
