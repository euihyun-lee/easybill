import { useState, useEffect, useRef } from "react";
import { CListGroupItem, CCloseButton, CButton, CRow, CCol, CInputGroup, CFormInput } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPlus, cilMinus } from "@coreui/icons";

import ConfirmRemoveModal from "./modals/ConfirmRemoveModal";
import { numWithCommas, isDigit } from "./utils";

function OrderedItem({ order, setAmount, orderRemover }) {
  const [tempValue, setTempValue] = useState(order.amount);
  const [confirmRemoveVisible, setConfirmRemoveVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setTempValue(order.amount);
  }, [order.amount]);

  return (
    <CListGroupItem>
      <CRow className="align-items-center">
        <CCloseButton
          style={{ width: '0.5em', height: '0.5em' }}
          onClick={() => setConfirmRemoveVisible(true)} />
        <CCol>{order.name}</CCol>
        <CCol xs="auto" style={{ textAlign: "right", paddingRight: "1.5rem" }}>
          {numWithCommas(order.cost)}원
        </CCol>
        <CCol xs="auto" style={{ padding: '0' }}>
          <CInputGroup>
            <CButton
              color="secondary"
              disabled={!isDigit(tempValue) || tempValue <= 1}
              style={{ padding: '0.25rem' }}
              onClick={() => {
                let newValue = order.amount > 1 ? order.amount - 1 : 1;
                setAmount(newValue);
              }}>
              <CIcon
                icon={cilMinus}
                size="sm"
                style={{ color: 'white' }} />
            </CButton>
            <CFormInput
              ref={inputRef}
              type="text"
              style={{ width: '2rem', textAlign: 'center', padding: '0' }}
              value={tempValue}
              onChange={e => setTempValue(e.target.value)}
              onBlur={e => {
                let newValue = parseInt(e.target.value) ? parseInt(e.target.value) : order.amount;
                setAmount(newValue);
                setTempValue(newValue);
              }} />
            <CButton
              color="secondary"
              disabled={!isDigit(tempValue)}
              style={{ padding: '0.25rem' }}
              onClick={() => {
                let newValue = order.amount + 1;
                setAmount(newValue);
              }}>
              <CIcon
                icon={cilPlus}
                size="sm"
                style={{ color: 'white' }} />
            </CButton>
          </CInputGroup>
        </CCol>
      </CRow>
      <ConfirmRemoveModal
        visible={confirmRemoveVisible}
        setVisible={setConfirmRemoveVisible}
        remover={orderRemover}
        title="주문 내역 삭제"
        body={
          <>
            주문 내역 <b>{order.name}</b> 삭제합니다.<br/>
            확실합니까?
          </>
        } />
    </CListGroupItem>
  );
}

export default OrderedItem;
