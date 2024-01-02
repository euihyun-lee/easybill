import "@coreui/coreui/dist/css/coreui.min.css";
import { CNavbar, CContainer, CNavbarBrand, CRow, CCol } from "@coreui/react";

import logo from './logo.svg';

function Navbar({ title, total }) {
  return (
    <CNavbar colorScheme="light" className="bg-light">
      <CCol>
        <CNavbarBrand>
          <img src={logo} alt="logo" width="22" height="24" />
	  {title}
	</CNavbarBrand>
      </CCol>
      <CCol style={{ textAlign: 'right' }}>
        <CNavbarBrand>{total}</CNavbarBrand>
      </CCol>
    </CNavbar>
  );
}

export default Navbar;
