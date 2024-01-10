import "@coreui/coreui/dist/css/coreui.min.css";
import { useState, useEffect, useRef } from "react";
import { CNavbar, CContainer, CNavbarBrand, CRow, CCol } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMenu } from "@coreui/icons";

import OffCanvas from "./OffCanvas";
import { numWithCommas, getWindowSize, getTextWidth, getCanvasFont } from "./utils";

function Navbar({ title, total, managementMenus }) {
  const totalRef = useRef(null);
  const getTotalWidth = () => getTextWidth(numWithCommas(total) + "원",
                                           getCanvasFont(totalRef.current || document.body));
  const [totalWidth, setTotalWidth] = useState(getTotalWidth());
  const [offCanvasVisible, setOffCanvasVisible] = useState(false);

  useEffect(() => {
    setTotalWidth(getTotalWidth());
  }, [total]);

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
            style={{ marginLeft: '0px', marginRight: '0px' }}
            onClick={() => setOffCanvasVisible(true)} />
        </CCol>
        <CCol
          style={{
            paddingLeft: 'var(--cui-navbar-padding-x)',
            overflow: 'hidden'
          }}>
          <CNavbarBrand
            style={{
              width: 'calc( ' + Math.max(getWindowSize().width - 24 - totalWidth - 1) + 'px' +
                            ' - 3 * var(--cui-navbar-padding-x) - 1.5rem )',
              marginRight: '0rem'
            }}>
            {title}
          </CNavbarBrand>
        </CCol>
        <CCol xs="auto" style={{ textAlign: 'right' }}>
          <CNavbarBrand ref={totalRef} style={{ marginLeft: '0.5rem' }}>
            {numWithCommas(total)}원
          </CNavbarBrand>
        </CCol>
      </CNavbar>
    </>
  );
}

export default Navbar;
