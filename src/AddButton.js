import "@coreui/coreui/dist/css/coreui.min.css";
import { useState } from "react";
import { CRow, CCol, CFormInput, CButton } from "@coreui/react";

function AddButton({ rowAdder }) {
  const [name, setName] = useState("");
  return (
    <CRow>
      <CCol>
        <CFormInput type="text" placeholder="Name" onChange={e => setName(e.target.value)} />
      </CCol>
      <CCol>
        <CButton type="button" onClick={() => rowAdder(name)}>Add</CButton>
      </CCol>
    </CRow>
  );
}

export default AddButton;

