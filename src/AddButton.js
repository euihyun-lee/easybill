import "@coreui/coreui/dist/css/coreui.min.css";
import { CForm, CCol, CFormInput, CButton } from "@coreui/react";

function AddButton() {
  return (
    <CForm className="row">
      <CCol xs="auto">
        <CFormInput type="text" placeholder="Name" />
      </CCol>
      <CCol xs="auto">
        <CButton type="submit">Add</CButton>
      </CCol>
    </CForm>
  );
}

export default AddButton;

