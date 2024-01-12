import { CButton } from "@coreui/react";
import { CModal, CModalTitle, CModalHeader, CModalBody, CModalFooter } from "@coreui/react";

function ConfirmRemoveModal({ visible, setVisible, remover, title, body }) {
  return (
    <CModal
      visible={visible}
      onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {body}
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

export default ConfirmRemoveModal;
