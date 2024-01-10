import { useState } from "react";
import { CListGroup, CListGroupItem } from "@coreui/react";
import { CModal, CModalTitle, CModalHeader, CModalBody } from "@coreui/react";
import { CRow, CCol, CCloseButton } from "@coreui/react";
import { CCard, CCardTitle, CCardBody, CCardText } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPlus } from "@coreui/icons";

import { numWithCommas } from "../utils";
import CorkageModal from "./CorkageModal";

function DeliveryDetailItem({ detail }) {
  return (
    <CListGroupItem>
      <CRow>
        <CCol>{detail.name}</CCol>
        <CCol style={{ textAlign: "right", paddingRight: "1.5rem" }}>
          {numWithCommas(detail.cost)}원
        </CCol>
      </CRow>
    </CListGroupItem>
  );
}

function DeliveryDetailModal({ visible, onClose, item }) {
  return (
    <CModal scrollable visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>외부 음식 상세 내역</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CListGroup flush>
          {item.details.map((detail) => <DeliveryDetailItem detail={detail} />)}
        </CListGroup>
      </CModalBody>
    </CModal>
  );
}

function DeliveryItem({ item, setParentVisible }) {
  const [deliveryDetailVisible, setDeliveryDetailVisible] = useState(false);

  return (
    <>
      <CCard onClick={() => {
        setDeliveryDetailVisible(true);
        setParentVisible(false);
      }}>
        <CRow className="g-0">
          <CCol>
            <CCardBody>
              <CCardTitle>{item.name}</CCardTitle>
              <CCardText>{numWithCommas(item.cost)}원 ({item.payer} 결제)</CCardText>
            </CCardBody>
          </CCol>
          <CCloseButton
            style={{
              marginRight: 'calc( var(--cui-card-spacer-x) / 2 )',
              marginTop: 'calc( var(--cui-card-spacer-y) / 2 )'
            }}
            onClick={() => {}} />
        </CRow>
      </CCard>
      <DeliveryDetailModal
        visible={deliveryDetailVisible}
        onClose={() => {
          setParentVisible(true);
          setDeliveryDetailVisible(false);
        }}
        item={item} />
    </>
  );
}

function DeliveryModal({ visible, setVisible, currentId, setCurrentId,
                         deliveryList, setDeliveryList, memberList, setMemberList }) {
  const [corkageModalVisible, setCorkageModalVisible] = useState(false);

  return (
    <>
      <CModal scrollable unmountOnClose={false} visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>외부 음식 내역</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {deliveryList.map((item) => <DeliveryItem item={item} setParentVisible={setVisible} />)}
          <CCard
            className="align-items-center"
            onClick={() => {
              setCorkageModalVisible(true);
              setVisible(false);
            }}>
            <CIcon
              icon={cilPlus}
              size="xxl"
              style={{ color: 'grey' }} />
          </CCard>
        </CModalBody>
      </CModal>
      <CorkageModal
        visible={corkageModalVisible}
        setVisible={setCorkageModalVisible}
        currentDeliveryId={currentId}
        setCurrentDeliveryId={setCurrentId}
        deliveryList={deliveryList}
        setDeliveryList={setDeliveryList}
        memberList={memberList}
        setMemberList={setMemberList} />
    </>
  );
}

export default DeliveryModal;
