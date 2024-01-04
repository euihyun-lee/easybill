import { useState, useEffect, useRef } from "react";
import { CButton, CInputGroup, CFormInput } from "@coreui/react";
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from "@coreui/react";

function TitleInput({ setTitle }) {
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
      placeholder="새 계산서"
      onChange={e => setTitle(e.target.value)} />
  );
}

function NewModal({ visible, onClose }) {
  const [tempTitle, setTempTitle] = useState("새 계산서");

  return (
    <CModal
      visible={visible}
      onClose={onClose(false)}>
      <CModalHeader onClose={onClose(false)}>
        <CModalTitle>새 계산서</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CInputGroup>
          <TitleInput setTitle={setTempTitle} />
          <CButton
            type="button"
            onClick={onClose(true, tempTitle)}>
            확인
          </CButton>
        </CInputGroup>
      </CModalBody>
    </CModal>
  );
}

function ConfirmNewModal({ visible, setVisible, setConfirmed, setTitle }) {
  const [newModalVisible, setNewModalVisible] = useState(false);
  const onNewModalClose = (confirmed, title) => {
    return () => {
      setNewModalVisible(false);
      if (confirmed) {
        setTitle(title);
        setConfirmed(true);
      }
    };
  };

  return (
    <>
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
              setNewModalVisible(true);
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
      <NewModal visible={newModalVisible} onClose={onNewModalClose} />
    </>
  );
}

export default ConfirmNewModal;
