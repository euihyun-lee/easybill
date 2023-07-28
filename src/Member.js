import { Component } from "react";

import Order from "./Order";

class Member {
  id;
  name;
  orders = [];

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export default Member;
