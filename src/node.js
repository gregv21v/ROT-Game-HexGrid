import {GameProperties} from "./gameProperties.js"

export class Node {
  // place a node at the corner of each hex
  constructor() {
    this.owner = 0;

    // the corrindates of each connected hex
    this.connectedHexes = []; // should be about 3
  }
}
