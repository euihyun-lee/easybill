import { useState, useEffect, useRef } from "react";
import { CButton, CInputGroup, CFormInput } from "@coreui/react";
import { CModal, CModalHeader, CModalTitle, CModalBody } from "@coreui/react";

function MemberNameInput({ setName }) {
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
      placeholder="이름"
      onChange={e => setName(e.target.value)} />
  );
}

function MemberAddModal({ visible, setVisible, memberAdder }) {
  const [name, setName] = useState("");

  return (
    <CModal
      visible={visible}
      onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>참석자 추가</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CInputGroup>
          <MemberNameInput setName={setName} />
          <CButton
            type="button"
            onClick={() => {
              memberAdder(name);
              setVisible(false);
            }}>
            추가
          </CButton>
        </CInputGroup>
      </CModalBody>
    </CModal>
  );
}

export default MemberAddModal;
