import "@coreui/coreui/dist/css/coreui.min.css";
import { useState } from "react";
import { CAccordionItem, CAccordionHeader, CAccordionBody, CRow, CCol, CCard, CCardImage } from "@coreui/react";

import Menu from "./Menu";
import OrderedItem from "./OrderedItem";

import logo from './logo.svg';

function MemberItem({ member }) {
  const [orders, setOrders] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const setOrderAmount = target => {
    return amount => {
      let newOrders = [...orders];
      for (let order of newOrders) {
        if (order.id == target.id) {
          order.amount = amount;
          break;
        }
      }
      setOrders(newOrders);
    }
  }
  const orderAdder = menu => {
    let added = false;
    let newOrders = [...orders];
    for (let order of newOrders) {
      if (order.id == menu.id) {
        order.amount = order.amount + 1;
        added = true;
        break;
      }
    }
    if (!added) {
      newOrders.push({
        id: menu.id,
        name: menu.name,
        cost: menu.cost,
        costText: menu.costText,
        amount: 1
      });
    }
    setOrders(newOrders);
  }
  const orderedItems = orders.map(order =>
    <CCol xs="auto">
      <OrderedItem order={order} setAmount={setOrderAmount(order)} />
    </CCol>
  );

  return (
    <CAccordionItem itemkey={member.id}>
      <CAccordionHeader>{member.name}</CAccordionHeader>
      <CAccordionBody>
        <CRow xs="auto">
         {orderedItems}
          <CCol xs="auto">
            <CCard className="flex-row" style={{ width: '18rem', height: '20rem' }} onClick={() => setMenuVisible(true)}>
              <CCardImage orientation="top" src={logo} />
            </CCard>
          </CCol>
        </CRow>
      </CAccordionBody>
      <Menu visible={menuVisible} setVisible={setMenuVisible} orderAdder={orderAdder} />
    </CAccordionItem>
  );
}

export default MemberItem;
