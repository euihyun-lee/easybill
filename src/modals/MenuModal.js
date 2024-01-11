import { useState } from "react";
import { CModal, CModalHeader, CModalTitle, CModalBody, CButton } from "@coreui/react";
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from "@coreui/react";
import { CCard, CCardBody, CCardTitle, CRow, CCol } from "@coreui/react";
import { CInputGroup, CInputGroupText, CFormInput } from "@coreui/react";

import "../css/style.css";
import MenuItem from "../MenuItem";
import { menus } from "../constants";

function CustomInput({ value, setValue }) {
  return (
    <CFormInput
      type="text"
      placeholder="기타 금액"
      onChange={e => setValue(e.target.value)} />
  );
}

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
    <CTabPane role="tabpanel" aria-labelledby={"tab-pane-" + id} visible={activeKey === id}>
      {items.map((menu) => <MenuItem menu={menu} orderAdder={orderAdder} />)}
    </CTabPane>
  );
}

// XXX: id for custom?
// TODO: customCostText: text -> number 변환 필요
function MenuModal({ visible, setVisible, orderAdder = () => {}, useCustom = false }) {
  const [activeKey, setActiveKey] = useState(1);
  const [customCostText, setCustomCostText] = useState("");

  return (
    <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>메뉴</CModalTitle>
      </CModalHeader>
      <CModalBody id="menu-tab" style={{ padding: "0", overflowX: "scroll", flexShrink: "0" }}>
        <CNav style={{ width: "max-content" }} variant="tabs" role="tablist">
          {menus.map((category) => 
            <CategoryNavItem
              id={category.id}
              name={category.name}
              activeKey={activeKey}
              setActiveKey={setActiveKey} />)}
          {useCustom && (
            <CNavItem role="presentation">
              <CNavLink
                active={activeKey === 0}
                component="button"
                role="tab"
                aria-controls="tab-pane-custom"
                aria-selected={activeKey === 0}
                onClick={() => setActiveKey(0)}>
              기타
              </CNavLink>
            </CNavItem>
          )}
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
          {useCustom && (
            <CTabPane role="tabpanel" aria-labelledby="tab-pane-custom" visible={activeKey === 0}>
              <CCard>
                <CRow className="g-0">
                  <CCol>
                    <CCardBody>
                      <CCardTitle>기타</CCardTitle>
                      <CInputGroup style={{ marginTop: '1rem' }}>
                        <CustomInput value={customCostText} setValue={setCustomCostText} />
                        <CInputGroupText>원</CInputGroupText>
                        <CButton
                          type="button"
                          onClick={() => orderAdder({id: 1, name: "기타", cost: customCostText})}>
                          확인
                        </CButton>
                      </CInputGroup>
                    </CCardBody>
                  </CCol>
                </CRow>
              </CCard>
            </CTabPane>
          )}
        </CTabContent>
      </CModalBody>
    </CModal>
  );
}

export default MenuModal;
