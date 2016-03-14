"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Map = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hex = require("./hex.js");

var _node = require("./node.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
  A hexagonal shapped hex map with nodes surrounding
  each hex.


  TODO:



  Access individual hex
  Access individual node
  Owner of hex

  Hex:
    Ownership
  Node:
    Ownership
*/

var Map = exports.Map = function () {

  /*
    Radius: radius of the grid
    centerHex: the Hex in the center of the grid
  */

  function Map(context, radius, nodeRadius, hexSize, center) {
    _classCallCheck(this, Map);

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


  _createClass(Map, [{
    key: "set",
    value: function set(q, r, hex) {
      this.hexes[q + "," + r] = hex;
    }

    // TODO: add another set function with two parameters if possible

    /*
      Gets the hexagon at the axial position q, r
    */

  }, {
    key: "get",
    value: function get(q, r) {
      return this.hexes[q + "," + r];
    }

    /*
      Determines if a hex exists at q, r
    */

  }, {
    key: "exists",
    value: function exists(q, r) {
      return this.hexes[q + "," + r] != null;
    }

    // TODO: add another get function with one parameters if possible

    /*
      Get the neighbors of the given hex at coordinate (q, r)
    */

  }, {
    key: "getNeighbors",
    value: function getNeighbors(q, r) {
      var neighbors = [];
      var directions = [{ q: 0, r: -1 }, { q: 1, r: -1 }, { q: 1, r: 0 }, { q: 0, r: 1 }, { q: -1, r: 1 }, { q: -1, r: 0 }];

      for (var i = 0; i < directions.length; i++) {
        var newNeighbor = {
          q: q + directions[i].q,
          r: r + directions[i].r,
          index: i
        };
        if (this.get(newNeighbor.q, newNeighbor.r)) {
          neighbors.push(newNeighbor);
        }
      }
      return neighbors;
    }

    /*
      Generates the hex grid
    */

  }, {
    key: "generateGrid",
    value: function generateGrid() {
      for (var q = -this.radius; q <= this.radius; q++) {
        var r1 = Math.max(-this.radius, -q - this.radius);
        var r2 = Math.min(this.radius, -q + this.radius);
        for (var r = r1; r <= r2; r++) {
          var screenCoord = this.hexToPixelFlat(q, r, this.hexSize);
          var newHex = new _hex.Hex(this.context, this.center.x + screenCoord.x, this.center.y + screenCoord.y, this.hexSize);
          newHex.label = q + "," + r;
          this.set(q, r, newHex);
          this.hexOrdering.push({ q: q, r: r }); // for keeping track of how hexes are placed
        }
      }
    }

    /*
      Add the hexes surrunding a given node,
      to that node.
    */

  }, {
    key: "addHexesToNodes",
    value: function addHexesToNodes() {
      for (var coord in this.hexes) {
        for (var i = 0; i < 6; i++) {
          var nodeId = this.hexes[coord].getNodeId(i);
          var node = this.nodes[nodeId];
          node.connectedHexes.push(coord);
        }
      }
    }

    /*
      Counts the number of hexes controlled by a given
      player.
    */

  }, {
    key: "countHexesControlledBy",
    value: function countHexesControlledBy(player) {
      var count = 0;
      // each hex's control is already given
      // over to the given player when that player
      // selects that node, so it is unnecessary
      // to check the surrounding nodes of a given hex.
      for (var key in this.hexes) {
        if (this.hexes[key] == player) {
          count += 1;
        }
      }

      return count;
    }

    /*
      Checks to see if the given hex can be
      controlled by a given player.
    */

  }, {
    key: "canClaim",
    value: function canClaim(player, id) {
      var adjNodes = [];
      // get all adjacent nodes to the given nodeId

      // if they are all owned by the player return true
    }
  }, {
    key: "claim",
    value: function claim(player, id) {}
    // gives a given node to a player.


    /*
      Adds the surrounding nodes to the given hex
    */

  }, {
    key: "addNodes",
    value: function addNodes(q, r, lastId) {
      var newNodes = [];
      var lastId = lastId;

      // fill in any nodes neighboring to this one
      var neighbors = this.getNeighbors(q, r);

      // Fill in any existing nodes from neighbors that have already been visited.
      for (var i = 0; i < neighbors.length; i++) {
        if (this.get(neighbors[i].q, neighbors[i].r).visited) {
          this.get(q, r).setNodeId(this.get(neighbors[i].q, neighbors[i].r).getNodeId((neighbors[i].index + 2) % 6), (neighbors[i].index + 4) % 6);
          this.get(q, r).setNodeId(this.get(neighbors[i].q, neighbors[i].r).getNodeId((neighbors[i].index + 1) % 6), (neighbors[i].index + 5) % 6);
        }
      }

      // add nodes to current hex
      for (var i = 0; i < 6; i++) {
        if (this.get(q, r).getNodeId(i) == -1) {
          this.get(q, r).setNodeId(lastId, i);
          var corner = this.get(q, r).corner(i);
          var newNode = new _node.Node(this.context, corner.x, corner.y, this.nodeRadius);
          newNode.label = lastId + "";
          this.nodes.push(newNode);
          lastId += 1;
        }
      }
      this.get(q, r).visited = true;

      // Get nodes from the neighbors of this hex that haven't been visited
      for (var i = 0; i < neighbors.length; i++) {
        if (!this.get(neighbors[i].q, neighbors[i].r).visited) {
          this.addNodes(neighbors[i].q, neighbors[i].r, lastId);
        }
      }
    }

    /*
      Draws the entire map.
    */

  }, {
    key: "draw",
    value: function draw() {
      for (var hex in this.hexes) {
        this.hexes[hex].draw();
      }

      for (var i = 0; i < this.nodes.length; i++) {
        this.nodes[i].draw();
      }
    }

    /*
      Converts a hex to a pixel for the pointy hex layout.
      Taken from https://github.com/Bockit/hex
    */

  }, {
    key: "hexToPixelPointy",
    value: function hexToPixelPointy(q, r, size) {
      var x = size * Math.sqrt(3) * (q + r / 2);
      var y = size * (3 / 2) * r;
      return { x: x, y: y };
    }

    /*
      Converts a hex to a pixel for the flat hex layout.
      Taken from https://github.com/Bockit/hex
    */

  }, {
    key: "hexToPixelFlat",
    value: function hexToPixelFlat(q, r, size) {
      var x = size * (3 / 2) * q;
      var y = size * Math.sqrt(3) * (r + q / 2);
      return { x: x, y: y };
    }
  }]);

  return Map;
}();