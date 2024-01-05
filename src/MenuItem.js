import "@coreui/coreui/dist/css/coreui.min.css";
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CRow, CCol } from "@coreui/react";

import { numWithCommas } from "./utils";

function MenuItem({ menu, orderAdder }) {
  return (
    <CCard onClick={() => orderAdder(menu)}>
      <CRow className="g-0">
        <CCol>
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
