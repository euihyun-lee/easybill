import { CButton, CFormTextarea } from "@coreui/react";
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from "@coreui/react";

function ExportModal({ visible, setVisible }) {
  return (
    <CModal
      visible={visible}
      onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>계산서 내보내기</CModalTitle>
      </CModalHeader>
      <CModalBody>
        아래 내용을 복사하여 보관 후 <b>계산서 불러오기</b>로 불러오세요.
        <CFormTextarea rows={5} disabled>
          예시
        </CFormTextarea>
        <CButton color="dark" style={{ bottom: '2rem', right: '2rem', position: 'absolute', zIndex: '9999' }}>O</CButton>
      </CModalBody>
    </CModal>
  );
}

export default ExportModal;
