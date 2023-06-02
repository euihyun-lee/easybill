import "@coreui/coreui/dist/css/coreui.min.css";
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton, CRow, CCol, CFormInput } from "@coreui/react";

import logo from './logo.svg';

function OrderedItem({ order, setAmount }) {
  return (
    <CCard style={{ width: '18rem', height: '20rem' }}>
      <CCardImage orientation="top" src={logo} />
      <CCardBody>
        <CCardTitle>{order.name}</CCardTitle>
        <CCardText>{order.costText}</CCardText>
        <CRow className="g-0">
          <CCol className="col-auto">
            <CButton onClick={() => order.amount > 1 ? setAmount(order.amount - 1) : setAmount(order.amount)}>-</CButton>
          </CCol>
          <CCol>
            <CFormInput
              type="text"
              value={order.amount}
              onChange={e => setAmount(parseInt(e.target.value))} />
          </CCol>
          <CCol className="col-auto">
            <CButton onClick={() => setAmount(order.amount + 1)}>+</CButton>
          </CCol>
	</CRow>
      </CCardBody>
    </CCard>
  );
}

export default OrderedItem;
