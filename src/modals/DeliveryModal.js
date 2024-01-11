import { useState } from "react";
import { CListGroup, CListGroupItem } from "@coreui/react";
import { CModal, CModalTitle, CModalHeader, CModalBody, CModalFooter } from "@coreui/react";
import { CRow, CCol, CButton, CCloseButton } from "@coreui/react";
import { CCard, CCardTitle, CCardBody, CCardText } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPlus } from "@coreui/icons";

import { numWithCommas } from "../utils";
import CorkageModal from "./CorkageModal";

function ConfirmRemoveDeliveryModal({ visible, setVisible, remover }) {
  // TODO: 콜키지 삭제 체크 시 내역에서 콜키지도 삭제
  return (
    <CModal
      visible={visible}
      onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>외부 음식 내역 삭제</CModalTitle>
      </CModalHeader>
      <CModalBody>
        해당 외부 음식 내역을 지웁니다. 확실합니까?<br/>
        (콜키지도 삭제하려면, 주문 내역에서 지워주세요.)
      </CModalBody>
      <CModalFooter>
        <CButton
          color="primary"
          onClick={() => {
            remover();
            setVisible(false);
          }}>
          예
        </CButton>
        <CButton
          color="secondary"
          onClick={() => setVisible(false)}>
          아니오
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

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

function DeliveryItem({ item, setParentVisible, remover }) {
  const [deliveryDetailVisible, setDeliveryDetailVisible] = useState(false);
  const [confirmRemoveDeliveryVisible, setConfirmRemoveDeliveryVisible] = useState(false);

  const setConfirmRemoveVisibleWithParent = (visible) => {
    setConfirmRemoveDeliveryVisible(visible);
    setParentVisible(!visible);
  };

  return (
    <>
      <CCard>
        <CRow className="g-0">
          <CCol>
            <CCardBody
              onClick={() => {
                setDeliveryDetailVisible(true);
                setParentVisible(false);
              }}>
              <CCardTitle>{item.name}</CCardTitle>
              <CCardText>{numWithCommas(item.cost)}원 ({item.payer} 결제)</CCardText>
            </CCardBody>
          </CCol>
          <CCloseButton
            style={{
              marginRight: 'calc( var(--cui-card-spacer-x) / 2 )',
              marginTop: 'calc( var(--cui-card-spacer-y) / 2 )'
            }}
            onClick={() => setConfirmRemoveVisibleWithParent(true)} />
        </CRow>
      </CCard>
      <DeliveryDetailModal
        visible={deliveryDetailVisible}
        onClose={() => {
          setParentVisible(true);
          setDeliveryDetailVisible(false);
        }}
        item={item} />
      <ConfirmRemoveDeliveryModal
        visible={confirmRemoveDeliveryVisible}
        setVisible={setConfirmRemoveVisibleWithParent}
        remover={remover} />
    </>
  );
}

function DeliveryModal({ visible, setVisible, currentId, setCurrentId,
                         deliveryList, setDeliveryList, memberList, setMemberList }) {
  const [corkageModalVisible, setCorkageModalVisible] = useState(false);

  const deliveryRemover = (targetId) => {
    return () => {
      let idx = deliveryList.findIndex(function(item) {return item.id === targetId});
      if (idx > -1) {
        let newDeliveryList = [...deliveryList];
        newDeliveryList.splice(idx, 1);
      	setDeliveryList(newDeliveryList);
      }
    };
  };

  return (
    <>
      <CModal scrollable unmountOnClose={false} visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>외부 음식 내역</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {deliveryList.map((item) =>
            <DeliveryItem
              item={item}
              setParentVisible={setVisible}
              remover={deliveryRemover(item.id)} />)}
          <CRow className="justify-content-center">
          <CButton
            color="secondary"
            size="lg"
            style={{
              width: '3rem',
              height: '3rem',
              '--cui-btn-border-radius': '2rem',
              padding: '0px',
              paddingTop: '3px',
              paddingLeft: '0px'
            }}
            onClick={() => {
              setCorkageModalVisible(true);
              setVisible(false);
            }}>
            <CIcon
              icon={cilPlus}
              size="xxl"
              style={{ color: 'white' }} />
          </CButton>
          </CRow>
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
