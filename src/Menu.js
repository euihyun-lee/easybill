import "@coreui/coreui/dist/css/coreui.min.css";
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from "@coreui/react";

import MenuItem from "./MenuItem";

function Menu({ visible, setVisible, orderAdder }) {
  const menus = [
    { id: 1, name: "Temp", cost: 3000, costText: "3,000 won" },
    { id: 2, name: "Temp2", cost: 5000, costText: "5,000 won" }
  ]
  const menuItems = menus.map(menu => <MenuItem menu={menu} orderAdder={orderAdder} />);

  return (
    <CModal alignment="center" scrollable visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Menu</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {menuItems}
      </CModalBody>
    </CModal>
  );
}

export default Menu;
