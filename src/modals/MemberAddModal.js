import { useState } from "react";
import { CButton, CInputGroup, CFormInput } from "@coreui/react";
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from "@coreui/react";

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
          <CFormInput type="text" placeholder="이름" onChange={e => setName(e.target.value)} />
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
