import { useState } from "react";

import Order from "./Order";

class Member {
  id;
  name;
  orders;
  
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.orders = [new Order("temp"), new Order("temp2")];
  }
}

export default Member;
