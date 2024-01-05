import { useState, useEffect, useRef } from "react";
import { CRow, CCol, CContainer, CButton, CFormCheck, CFormInput } from "@coreui/react";
import { CInputGroup, CInputGroupText } from "@coreui/react";
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from "@coreui/react";

import Member from "../Member.js";

function CorkageInput({ value, setValue }) {
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
      placeholder="외부 음식 금액"
      onChange={e => setValue(e.target.value)} />
  );
}

function CorkageModal({ visible, setVisible, memberList, setMemberList }) {
  const [corkage, setCorkage] = useState(0);
  const [corkageText, setCorkageText] = useState("");
  const [selectedList, setSelectedList] = useState([]);

  const onClose = (confirmed) => {
    return () => {
      setVisible(false);
      if (confirmed && selectedList.length > 0) {
        // TODO: text -> number 변환 필요
        let corkageFee = Math.round(parseInt(corkageText) / 10 / selectedList.length);
        let newMemberList = [...memberList];
        for (let member of memberList) {
          if (selectedList.indexOf(member.id) >= 0) { // member id selected
            let idx = newMemberList.findIndex(function(target) {return target.id === member.id});
            if (idx > -1) {
              let newMember = new Member(member.id, member.name);
              newMember.orders = member.orders.concat({
                id: 0,  // XXX: id for corkage?
                name: "콜키지",
                cost: corkageFee,
                amount: 1
              });
              newMemberList[idx] = newMember;
            }
          }
        }
        setMemberList(newMemberList);
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
      setSelectedList([]);
    }
  }, [visible]);

  return (
    <CModal visible={visible} onClose={onClose(false)}>
      <CModalHeader onClose={onClose(false)}>
        <CModalTitle>콜키지 추가</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CContainer style={{ padding: '0px' }}>
          외부 음식의 금액과 멤버를 선택하세요.<br/>
          금액의 10%가 콜키지이며 이의 1/N씩 각각 부과됩니다.
        </CContainer>
        <CInputGroup style={{ marginTop: '1rem' }}>
          <CorkageInput value={corkageText} setValue={setCorkageText} />
          <CInputGroupText>원</CInputGroupText>
          <CButton
            type="button"
            onClick={onClose(true)}>
            확인
          </CButton>
        </CInputGroup>
        <CContainer style={{ padding: '0px', marginTop: '1rem' }}>
          <CRow xs={{ gutterX: 2 }}>
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
  );
}

export default CorkageModal;
