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

  static parse(obj) {
    let member = new Member(obj.id, obj.name);
    member.orders = obj.orders;
    return member;
  }
}

export default Member;
