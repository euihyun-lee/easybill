import "@coreui/coreui/dist/css/coreui.min.css";
import React, { useState } from "react";
import { CNavbar, CContainer, CNavbarBrand, CRow, CCol } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMenu } from "@coreui/icons";

import OffCanvas from "./OffCanvas";

function Navbar({ title, total, managementMenus }) {
  const [offCanvasVisible, setOffCanvasVisible] = useState(false);
  return (
    <>
    <OffCanvas
      visible={offCanvasVisible}
      setVisible={setOffCanvasVisible}
      managementMenus={managementMenus} />
    <CNavbar colorScheme="light" className="bg-light">
      <CCol xs="auto" style={{ display: 'flex' }}>
        <CIcon
          icon={cilMenu}
          size="xl"
          style={{ marginLeft: '10px', marginRight: '10px' }}
          onClick={() => setOffCanvasVisible(true)} />
      </CCol>
      <CCol>
        <CNavbarBrand>{title}</CNavbarBrand>
      </CCol>
      <CCol style={{ textAlign: 'right' }}>
        <CNavbarBrand>{total}</CNavbarBrand>
      </CCol>
    </CNavbar>
    </>
  );
}

export default Navbar;
