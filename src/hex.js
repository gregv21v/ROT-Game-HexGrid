export class Hex {
  constructor() {
    this.owner = 0;
    this.visited = false;

    this.nodeIds = [];
    for(var i = 0; i < 6; i++) {
      this.nodeIds.push(-1);
    }
  }

  /*
    Sets the id of the node at the given index
  */
  setNodeId(id, index) {
    this.nodeIds[index] = id;
  }

  /*
    Gets the id of the node at the given index
  */
  getNodeId(index) {
    return this.nodeIds[index];
  }
}
