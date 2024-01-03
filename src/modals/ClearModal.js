import { CButton } from "@coreui/react";
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from "@coreui/react";

function ClearModal({ visible, setVisible, setConfirmed }) {
  return (
    <CModal
      visible={visible}
      onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>새 계산서</CModalTitle>
      </CModalHeader>
      <CModalBody>
        현재 내역을 모두 지우고 새 계산서를 준비합니다.<br/>
        확실합니까?
      </CModalBody>
      <CModalFooter>
        <CButton
          color="primary"
          onClick={() => {
            setConfirmed(true);
            setVisible(false);}}>
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

export default ClearModal;
