import { useState } from "react";
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from "@coreui/react";
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from "@coreui/react";

import MenuItem from "../MenuItem";
import { menus } from "../constants";

function CategoryNavItem({ id, name, activeKey, setActiveKey }) {
  return (
    <CNavItem role="presentation">
      <CNavLink
        active={activeKey === id}
        component="button"
        role="tab"
        aria-controls={"tab-pane-" + id}
        aria-selected={activeKey === id}
        onClick={() => setActiveKey(id)}>
      {name}
      </CNavLink>
    </CNavItem>
  );
}

function CategoryItemList({ id, items, orderAdder, activeKey }) {
  return (
    <CTabPane role="tabpanel" aria-labelledby={"tab-pane" + id} visible={activeKey === id}>
      {items.map((menu) => <MenuItem menu={menu} orderAdder={orderAdder} />)}
    </CTabPane>
  );
}

function MenuModal({ visible, setVisible, orderAdder = () => {} }) {
  const [activeKey, setActiveKey] = useState(1);

  return (
    <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>메뉴</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ padding: "0", overflowX: "scroll", flexShrink: "0" }}>
        <CNav style={{ width: "max-content" }} variant="tabs" role="tablist">
          {menus.map((category) => 
            <CategoryNavItem
              id={category.id}
              name={category.name}
              activeKey={activeKey}
              setActiveKey={setActiveKey} />)}
        </CNav>
      </CModalBody>
      <CModalBody>
        <CTabContent>
          {menus.map((category) =>
            <CategoryItemList
              id={category.id}
              items={category.items}
              orderAdder={orderAdder}
              activeKey={activeKey} />)}
        </CTabContent>
      </CModalBody>
    </CModal>
  );
}

export default MenuModal;
