import "@coreui/coreui/dist/css/coreui.min.css";
import { CNavbar, CContainer, CNavbarBrand } from "@coreui/react";

import logo from './logo.svg';

function Navbar() {
  return (
    <CNavbar colorScheme="light" className="bg-light">
      <CContainer fluid>
        <CNavbarBrand href="#">
          <img src={logo} alt="logo" width="22" height="24" />
          Navbar
        </CNavbarBrand>
      </CContainer>
    </CNavbar>
  );
}

export default Navbar;
