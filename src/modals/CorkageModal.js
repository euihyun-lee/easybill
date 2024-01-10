import { useState, useEffect, useRef } from "react";
import { CRow, CCol, CContainer, CButton, CFormCheck, CFormInput } from "@coreui/react";
import { CInputGroup, CInputGroupText } from "@coreui/react";
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from "@coreui/react";
import { CListGroup, CListGroupItem } from "@coreui/react";
import { CAlert } from "@coreui/react";
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from "@coreui/react";

import { numWithCommas } from "../utils";
import Member from "../Member.js";

function CorkageDetailItem({ detail, setDetailCost }) {
  const [costText, setCostText] = useState(detail.cost);

  return (
    <CListGroupItem>
      <CRow>
        <CCol style={{ alignSelf: 'center' }}>{detail.name}</CCol>
        <CCol xs="auto">
          <CInputGroup>
            <CFormInput
              type="text"
              value={costText}
              style={{ width: '5rem', textAlign: 'right' }}
              onChange={e => setCostText(e.target.value)}
              onBlur={e => {
                let newValue = parseInt(e.target.value) ? parseInt(e.target.value) : detail.cost;
                setDetailCost(newValue);
                setCostText(newValue);
              }} />
            <CInputGroupText>원</CInputGroupText>
          </CInputGroup>
        </CCol>
      </CRow>
    </CListGroupItem>
  );
}

function CorkageDetailModal({ visible, setVisible, detailList, setDetailList,
                              payer, setPayer, onClose }) {
  const setDetailCost = (targetDetail) => {
    let newDetailList = [...detailList];
    return (cost) => {
      for (let detail of newDetailList) {
        if (detail.id === targetDetail.id) {
          detail.cost = cost;
        }
      }
      setDetailList(newDetailList);
    };
  };

  return (
    <CModal scrollable visible={visible} onClose={onClose(false)}>
      <CModalHeader>
        <CModalTitle>외부 음식 정산 상세</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CListGroup flush>
          {detailList.map((detail) =>
            <CorkageDetailItem detail={detail} setDetailCost={setDetailCost(detail)}/>
          )}
          <CListGroupItem>
            <CRow>
              <CCol style={{ alignSelf: 'center' }}>누가 결제했습니까?</CCol>
              <CCol xs="auto">
                <CInputGroup>
                  <CDropdown variant="input-group">
                    <CDropdownToggle color="primary" variant="outline">{payer}</CDropdownToggle>
                    <CDropdownMenu>
                      {detailList.map((detail) =>
                        <CDropdownItem onClick={() => setPayer(detail.name)}>
                          {detail.name}
                        </CDropdownItem>
                      )}
                    </CDropdownMenu>
                  </CDropdown>
                  <CButton
                    type="button"
                    onClick={onClose(true)}>
                    확인
                  </CButton>
                </CInputGroup>
              </CCol>
            </CRow>
          </CListGroupItem>
        </CListGroup>
      </CModalBody>
    </CModal>
  );
}

function CorkageNameInput({ value, setValue }) {
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current !== null) inputRef.current.focus();
    }, 200);
  }, [inputRef.current]);

  return (
    <CFormInput
      ref={inputRef}
      type="text"
      placeholder="외부 음식 이름"
      onChange={e => setValue(e.target.value)} />
  );
}

function CorkageModal({ visible, setVisible,
                        currentDeliveryId, setCurrentDeliveryId,
                        deliveryList, setDeliveryList,
                        memberList, setMemberList }) {
  const [corkage, setCorkage] = useState(0);
  const [corkageName, setCorkageName] = useState("외부 음식");
  const [corkageText, setCorkageText] = useState("");
  const [selectedList, setSelectedList] = useState([]);
  const [detailList, setDetailList] = useState([]);
  const [payer, setPayer] = useState("");
  const [noMemberAlertVisible, setNoMemberAlertVisible] = useState(false);
  const [corkageDetailModalVisible, setCorkageDetailModalVisible] = useState(false);

  const onDetailClose = (confirmed) => {
    return () => {
      setCorkageDetailModalVisible(false);
      if (confirmed) {
        let corkageRemain = Math.round(parseInt(corkageText) / 10);
        for (let detail of detailList) {
          corkageRemain = corkageRemain - Math.round(detail.cost / 10);
        }
        let newMemberList = [...memberList];
        for (let detail of detailList) {
          let idx = newMemberList.findIndex(function(target) {return target.id === detail.id});
          if (idx > -1) {
            newMemberList[idx].orders.push({
              id: 0,  // XXX: id for corkage?
              name: "콜키지(" + corkageName + ")",
              cost: Math.round(detail.cost / 10) + corkageRemain,
              amount: 1
            });
            corkageRemain = 0;
          }
          // TODO: 못 찾았을 때 핸들링?
        }
        setMemberList(newMemberList);
        setDeliveryList(deliveryList.concat({
          id: currentDeliveryId,
          name: corkageName,
          cost: parseInt(corkageText),  // TODO: text -> number 변환
          payer: payer,
          details: [...detailList]
        }));
        setCurrentDeliveryId(currentDeliveryId + 1);
      }
    };
  };
  const onClose = (confirmed) => {
    return () => {
      if (confirmed && selectedList.length > 0) {
        // TODO: text -> number 변환 필요
        let detailRemain = Math.round(parseInt(corkageText));
        let detailCost = Math.round(parseInt(corkageText) / selectedList.length);
        let newDetailList = [];
        for (let member of memberList) {
          if (selectedList.indexOf(member.id) >= 0) { // member id selected
            let idx = memberList.findIndex(function(target) {return target.id === member.id});
            if (idx > -1) {
              newDetailList.push({
                id: member.id,
                name: member.name,
                cost: detailCost // TODO: text -> num
              });
              detailRemain = detailRemain - detailCost;
            }
            // TODO: 못 찾았을 때 핸들링?
          }
        }
        newDetailList[0].cost = newDetailList[0].cost + detailRemain;

        setDetailList(newDetailList);
        setPayer(newDetailList[0].name);
        setCorkageDetailModalVisible(true);
        setVisible(false);
      } else if (confirmed) {
        setNoMemberAlertVisible(true);
      } else {
        setVisible(false);
      }
    };
  };
  const onChecked = (id) => {
    return (e) => {
      let newSelectedList = [...selectedList];
      let idx = newSelectedList.indexOf(id);
      if (idx > -1) {  // found
        if (!e.target.checked) {  // should be removed
          newSelectedList.splice(idx, 1);
        }
      } else {  // not found
        if (e.target.checked) {  // should be added
          newSelectedList.push(id);
        }
      }
      setSelectedList(newSelectedList);
    };
  };

  useEffect(() => {
    if (visible) {
      setCorkage(0);
      setCorkageText("");
      setCorkageName("외부 음식");
      setDetailList([]);
      setSelectedList([]);
      setPayer("");
      setNoMemberAlertVisible(false);
    }
  }, [visible]);

  return (
    <>
      <CModal visible={visible} onClose={onClose(false)}>
        <CModalHeader onClose={onClose(false)}>
          <CModalTitle>외부 음식 정산</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CAlert visible={noMemberAlertVisible} color="danger">
            외부 음식을 먹은 멤버들을 선택하세요.
          </CAlert>
          <CContainer style={{ padding: '0px', marginBottom: '0.75rem' }}>
            외부 음식의 이름 및 금액과 멤버를 선택하세요.<br/>
            금액의 10%가 콜키지로 추가됩니다.
          </CContainer>
          <CorkageNameInput value={corkageName} setValue={setCorkageName} />
          <CInputGroup style={{ marginTop: '0.5rem' }}>
            <CFormInput
              type="text"
              placeholder="외부 음식 금액"
              onChange={e => setCorkageText(e.target.value)} />
            <CInputGroupText>원</CInputGroupText>
            <CButton
              type="button"
              onClick={onClose(true)}>
              확인
            </CButton>
          </CInputGroup>
          <CContainer style={{ padding: '0px', marginTop: '0.5rem' }}>
            <CRow xs={{ gutterX: 2, gutterY: 2 }}>
            {memberList.map(member => 
              <CCol xs="auto">
              <CFormCheck
                button={{ color: 'primary', variant: 'outline' }}
                id={"btn-check-outlined-" + member.id}
                autoComplete="off"
                checked={selectedList.indexOf(member.id) >= 0}
                onChange={onChecked(member.id)}
                label={member.name} />
              </CCol>
            )}
            </CRow>
          </CContainer>
        </CModalBody>
      </CModal>
      <CorkageDetailModal
        visible={corkageDetailModalVisible}
        setVisible={setCorkageDetailModalVisible}
        detailList={detailList}
        setDetailList={setDetailList}
        payer={payer}
        setPayer={setPayer}
        onClose={onDetailClose} />
    </>
  );
}

export default CorkageModal;
