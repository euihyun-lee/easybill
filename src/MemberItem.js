import "@coreui/coreui/dist/css/coreui.min.css";
import { useState, useEffect } from "react";
import { CAccordionItem, CAccordionHeader, CAccordionBody, CListGroup, CListGroupItem, CRow, CCol, CCard, CCloseButton } from "@coreui/react";

import MenuModal from "./modals/MenuModal";
import OrderedItem from "./OrderedItem";

import logo from './logo.svg';

function MemberItem({ member, setOrders, memberRemover }) {
  const orders = [...member.orders];
  const [total, setTotal] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const setOrderAmount = target => {
    return amount => {
      let newOrders = [...orders];
      for (let order of newOrders) {
        if (order.id === target.id) {
          order.amount = amount;
          break;
        }
      }
      setOrders(newOrders);
    }
  }
  const orderRemover = target => {
    return () => {
      let idx = orders.findIndex(function(order) {return order.id === target.id});
      if (idx > -1) {
        let newOrders = [...orders];
        newOrders.splice(idx, 1);
        setOrders(newOrders);
      }
    }
  }
  const orderAdder = menu => {
    let added = false;
    let newOrders = [...orders];
    for (let order of newOrders) {
      if (order.id === menu.id) {
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
    setMenuVisible(false);
  }
  const orderedItems = orders.map(order =>
    <OrderedItem
      order={order}
      setAmount={setOrderAmount(order)}
      orderRemover={orderRemover(order)} />
  );

  useEffect(() => {
    let curTotal = 0;
    for (let order of orders) {
      curTotal = curTotal + order.cost * order.amount;
    }
    setTotal(curTotal);
  }, [orders]);

  return (
    <CAccordionItem itemkey={member.id}>
      <CAccordionHeader>
        <CCol style={{ marginRight: '4%' }}>
          <CRow>
            <CCol xs="auto">
              <CCloseButton onClick={memberRemover}/>
            </CCol>
            <CCol>{member.name}</CCol>
            <CCol style={{ textAlign: 'right' }}>{total}</CCol>
          </CRow>
        </CCol>
      </CAccordionHeader>
      <CAccordionBody>
        <CListGroup flush>
         {orderedItems}
          <CListGroupItem onClick={() => setMenuVisible(true)} style={{ paddingLeft: 'calc(var(--cui-list-group-item-padding-x) + 8px + 0.25em + 0.75rem)', paddingTop: 'calc(var(--cui-list-group-item-padding-y) + 0.375rem)' }}>+ 추가</CListGroupItem>
        </CListGroup>
      </CAccordionBody>
      <MenuModal visible={menuVisible} setVisible={setMenuVisible} orderAdder={orderAdder} />
    </CAccordionItem>
  );
}

export default MemberItem;
