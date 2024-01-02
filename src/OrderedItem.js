import "@coreui/coreui/dist/css/coreui.min.css";
import { CListGroupItem, CCloseButton, CButton, CRow, CCol, CButtonGroup, CFormInput } from "@coreui/react";

import logo from './logo.svg';

function OrderedItem({ order, setAmount, orderRemover }) {
  return (
    <CListGroupItem>
      <CRow className="align-items-center">
        <CCloseButton onClick={orderRemover} />
        <CCol>{order.name}</CCol>
        <CCol>{order.costText}</CCol>
        <CCol xs="auto">
          <CButtonGroup role="group">
            <CButton onClick={() => order.amount > 1 ? setAmount(order.amount - 1) : setAmount(order.amount)}>-</CButton>
            <CFormInput
              type="text"
              style={{ width: '3rem', textAlign: 'center' }}
              value={order.amount}
              onChange={e => setAmount(parseInt(e.target.value))} />
            <CButton onClick={() => setAmount(order.amount + 1)}>+</CButton>
          </CButtonGroup>
        </CCol>
      </CRow>
    </CListGroupItem>
  );
}

export default OrderedItem;
