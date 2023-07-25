import { Component } from "react";

import Order from "./Order";

class Member {
  id;
  name;
  order = [];

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export default Member;
