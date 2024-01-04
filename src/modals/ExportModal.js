import "@coreui/coreui/dist/css/coreui.min.css";
import { useState } from "react";
import { CButton, CFormTextarea } from "@coreui/react";
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilClipboard } from "@coreui/icons";

function ExportModal({ visible, setVisible, exportText }) {
  const [resultMsg, setResultMsg] = useState("");
  const [hasError, setHasError] = useState(false);
  const [formTextColor, setFormTextColor] = useState("var(--cui-secondary-color)");
  const [copyButtonBottom, setCopyButtonBottom] = useState("2rem");

  const onClose = () => {
    setVisible(false);
    setResultMsg("");
    setHasError(false);
    setFormTextColor("var(--cui-secondary-color)");
    setCopyButtonBottom("2rem");
  }
  const onCopy = (success) => {
    if (success) {
      setResultMsg("텍스트가 클립보드에 복사되었습니다!");
      setHasError(false);
      setFormTextColor("var(--cui-secondary-color)");
      setCopyButtonBottom("calc(2rem + var(--cui-border-width)" +
                          " + 1em * var(--cui-body-line-height))");
    } else {
      setResultMsg("텍스트 복사에 실패했습니다.");
      setHasError(true);
      setFormTextColor("var(--cui-form-invalid-color)");
      setCopyButtonBottom("calc(2rem + var(--cui-border-width)" +
                          " + 1em * var(--cui-body-line-height))");
    }
  }
  const handleCopyClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      onCopy(true);
    } catch (e) {
      onCopy(false);
    }
  };

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader onClose={onClose}>
        <CModalTitle>계산서 내보내기</CModalTitle>
      </CModalHeader>
      <CModalBody
        style={{ '--cui-form-text-color': formTextColor }}>
        아래 내용을 복사하여 보관 후 <b>계산서 불러오기</b>로 불러오세요.
        <CFormTextarea
          rows={5}
          text={resultMsg}
          invalid={hasError}
          disabled
          style={{ marginTop: '0.625rem' }}>{exportText}</CFormTextarea>
        <CButton
          color="dark"
          style={{
            '--cui-btn-padding-x': '0.6rem',
            bottom: copyButtonBottom,
            right: '2rem',
            position: 'absolute',
            zIndex: '9999' }}
          onClick={() => handleCopyClipboard(exportText)}>
          <CIcon
            icon={cilClipboard}
            style={{ '--ci-primary-color': 'white' }} />
        </CButton>
      </CModalBody>
    </CModal>
  );
}

export default ExportModal;
