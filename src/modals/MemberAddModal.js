import { useState } from "react";
import { CButton, CCol, CFormInput } from "@coreui/react";
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from "@coreui/react";

function MemberAddModal({ visible, setVisible, memberAdder }) {
  const [name, setName] = useState("");

  return (
    <CModal
      visible={visible}
      onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>멤버 추가</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCol>
          <CFormInput type="text" placeholder="이름" onChange={e => setName(e.target.value)} />
        </CCol>
        <CCol>
          <CButton type="button" onClick={() => memberAdder(name)}>Add</CButton>
        </CCol>
      </CModalBody>
    </CModal>
  );
}

export default MemberAddModal;
