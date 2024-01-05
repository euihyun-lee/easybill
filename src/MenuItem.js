import "@coreui/coreui/dist/css/coreui.min.css";
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CRow, CCol } from "@coreui/react";

import { numWithCommas } from "./utils";

import logo from './logo.svg';

function MenuItem({ menu, orderAdder }) {
  return (
    <CCard style={{ maxWidth: '540px' }} onClick={() => orderAdder(menu)}>
      <CRow className="g-0">
        <CCol className="col-4">
          <CCardImage orientation="top" src={logo} />
        </CCol>
        <CCol className="col-8">
          <CCardBody>
            <CCardTitle>{menu.name}</CCardTitle>
            <CCardText>{numWithCommas(menu.cost)}원</CCardText>
          </CCardBody>
        </CCol>
      </CRow>
    </CCard>
  );
}

export default MenuItem;
