import "@coreui/coreui/dist/css/coreui.min.css";
import { useState, useEffect } from "react";
import { CAccordionItem, CAccordionHeader, CAccordionBody } from "@coreui/react";
import { CListGroup, CListGroupItem, CRow, CCol, CCloseButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPlus } from "@coreui/icons";

import MenuModal from "./modals/MenuModal";
import OrderedItem from "./OrderedItem";
import { numWithCommas, getTotal } from "./utils";

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
    // id 0: corkage, 1: custom (duplicate allowed menus)
    let duplicateAllowed = (menu.id === 0 || menu.id === 1);

    if (!duplicateAllowed) {  
      for (let order of newOrders) {
        if (order.id === menu.id) {
          order.amount = order.amount + 1;
          added = true;
          break;
        }
      }
    }

    if (!added) {
      newOrders.push({
        id: menu.id,
        name: menu.name,
        cost: menu.cost,
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
    setTotal(getTotal(orders));
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
            <CCol style={{ textAlign: 'right' }}>{numWithCommas(total)}원</CCol>
          </CRow>
        </CCol>
      </CAccordionHeader>
      <CAccordionBody
        style={{ '--cui-accordion-body-padding-y': '0.25rem' }}>
        <CListGroup flush>
         {orderedItems}
          <CListGroupItem
            style={{
              paddingLeft: 'calc(var(--cui-list-group-item-padding-x) + 8px - 0.25em + 0.75rem)',
              paddingTop: 'calc(var(--cui-list-group-item-padding-y) + 0.375rem)',
              paddingBottom: 'calc(var(--cui-list-group-item-padding-y) + 0.375rem)'
            }}
            onClick={() => setMenuVisible(true)}>
          <CRow xs={{ gutterX: 1 }} className="align-items-center">
            <CCol xs="auto">
              <CIcon
                icon={cilPlus}
                size="lg"
                style={{ paddingTop: '3px', color: 'grey' }} />
            </CCol>
            <CCol>
              메뉴 추가
            </CCol>
          </CRow>
          </CListGroupItem>
        </CListGroup>
      </CAccordionBody>
      <MenuModal
        useCustom
        visible={menuVisible}
        setVisible={setMenuVisible}
        orderAdder={orderAdder} />
    </CAccordionItem>
  );
}

export default MemberItem;
