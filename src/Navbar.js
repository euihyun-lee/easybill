import "@coreui/coreui/dist/css/coreui.min.css";
import React, { useState } from "react";
import { CNavbar, CContainer, CNavbarBrand, CRow, CCol } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMenu } from "@coreui/icons";

import OffCanvas from "./OffCanvas";
import { numWithCommas } from "./utils";

function Navbar({ title, total, managementMenus }) {
  const [offCanvasVisible, setOffCanvasVisible] = useState(false);
  return (
    <>
      <OffCanvas
        visible={offCanvasVisible}
        setVisible={setOffCanvasVisible}
        managementMenus={managementMenus} />
      <CNavbar
        colorScheme="light"
        className="bg-light"
        style={{ '--cui-navbar-padding-y': '1rem',
                 '--cui-navbar-padding-x': '1.25rem' }}>
        <CCol xs="auto" style={{ display: 'flex' }}>
          <CIcon
            icon={cilMenu}
            size="xl"
            style={{ marginLeft: '0px', marginRight: '0rem' }}
            onClick={() => setOffCanvasVisible(true)} />
        </CCol>
        <CCol>
          <CNavbarBrand style={{ marginLeft: '1.25rem' }}>{title}</CNavbarBrand>
        </CCol>
        <CCol style={{ textAlign: 'right' }}>
          <CNavbarBrand>{numWithCommas(total)}원</CNavbarBrand>
        </CCol>
      </CNavbar>
    </>
  );
}

export default Navbar;
