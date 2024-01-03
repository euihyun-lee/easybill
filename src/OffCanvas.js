import "@coreui/coreui/dist/css/coreui.min.css";
import React, { useState } from "react";
import { CCloseButton } from "@coreui/react";
import { CListGroup, CListGroupItem } from "@coreui/react";
import { COffcanvas, COffcanvasHeader, COffcanvasTitle, COffcanvasBody } from "@coreui/react";

function OffCanvas({ visible, setVisible, managementMenus }) {
  const managementMenuItems = managementMenus.map(menu =>
    <CListGroupItem
      component="button"
      onClick={menu.func}>
      {menu.text}
    </CListGroupItem>
  );

  return (
    <COffcanvas
      placement="start"
      visible={visible}
      style={{ '--cui-offcanvas-width': '240px' }}
      onHide={() => setVisible(false)}>
      <COffcanvasHeader>
        <COffcanvasTitle>관리</COffcanvasTitle>
        <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
      </COffcanvasHeader>
      <COffcanvasBody
        style={{ '--cui-offcanvas-padding-x': '5px', '--cui-offcanvas-padding-y': '5px' }}>
        <CListGroup flush>
          {managementMenuItems}
        </CListGroup>
      </COffcanvasBody>
    </COffcanvas>
  );
}

export default OffCanvas;
