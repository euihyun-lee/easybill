import "@coreui/coreui/dist/css/coreui.min.css";
import { useState, useEffect, useRef, useMemo } from "react";
import { CImage, CContainer, CRow, CCol } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilUserPlus, cilShare } from "@coreui/icons";

import Navbar from "./Navbar";
import MemberList from "./MemberList";
import Member from "./Member";
import { getTotal, makeBill, getCurrentDate, getWindowSize } from "./utils";
import { getCssStyle, memberAdder } from "./utils";

import ConfirmNewModal from "./modals/NewModal";
import ExportModal from "./modals/ExportModal";
import MemberAddModal from "./modals/MemberAddModal";
import MenuModal from "./modals/MenuModal";
import DeliveryModal from "./modals/DeliveryModal";

import deliveryIcon from "./resources/images/food-delivery-white.png";

function App() {
  const [title, setTitle] = useState(() => {
    let localData = localStorage.getItem("title");
    if (localData !== null) return localData;
    return getCurrentDate() + " 푸른하늘";
  });
  const parseMemberList = (memberListString) => {
    let memberObjList = JSON.parse(memberListString);
    let maxId = 0;
    let parsedMemberList = [];
    for (let memberObj of memberObjList) {
      let member = Member.parse(memberObj);
      if (maxId < member.id) maxId = member.id;
      parsedMemberList.push(member);
    }
    return { maxId: maxId, parsedMemberList: parsedMemberList };
  };
  const parseDeliveryList = (deliveryListString) => {
    let parsedDeliveryList = JSON.parse(deliveryListString);
    let maxId = 0;
    for (let item of parsedDeliveryList) {
      if (maxId < item.id) maxId = item.id;
    }
    return { maxId: maxId, parsedDeliveryList: parsedDeliveryList };
  };

  const [currentId, setCurrentId] = useState(1);
  const [memberList, setMemberList] = useState(() => {
    let localData = localStorage.getItem("memberList");
    if (localData !== null) {
      let { maxId, parsedMemberList } = parseMemberList(localData);
      setCurrentId(maxId + 1);
      return parsedMemberList;
    }
    return [];
  });
  const [total, setTotal] = useState(0);
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [clearConfirmed, setClearConfirmed] = useState(false);
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [memberAddModalVisible, setMemberAddModalVisible] = useState(false);
  const [exportTextModalVisible, setExportTextModalVisible] = useState(false);
  const [currentDeliveryId, setCurrentDeliveryId] = useState(1);
  const [deliveryList, setDeliveryList] = useState(() => {
    let localData = localStorage.getItem("deliveryList");
    if (localData !== null) {
      let { maxId, parsedDeliveryList } = parseDeliveryList(localData);
      setCurrentDeliveryId(maxId + 1);
      return parsedDeliveryList;
    }
    return [];
  });
  const [deliveryModalVisible, setDeliveryModalVisible] = useState(false);

  const managementMenus = [
    { text: "새 계산서",
      func: () => setNewModalVisible(true) },
    { text: "계산서 내보내기",
      func: () => setExportModalVisible(true) },
    { text: "계산서 불러오기", func: () => {} },
    { text: "메뉴 보기",
      func: () => setMenuModalVisible(true) },
    { text: "메뉴 내보내기", func: () => {} },
    { text: "메뉴 불러오기", func: () => {} }
  ];

  const navBarRef = useRef(null);
  const tabBarRef = useRef(null);
  const bodyHeight = useMemo(() => {
    return ('calc( ' +
      getWindowSize().height + 'px - ' +
      (navBarRef.current !== null ? getCssStyle(navBarRef.current, 'height') : '0px') + ' - ' +
      (tabBarRef.current !== null ? getCssStyle(tabBarRef.current, 'height') : '0px') + ' )'
    );
  }, [navBarRef.current, tabBarRef.current]);

  useEffect(() => {
    let curTotal = 0;
    for (let member of memberList) {
      curTotal = curTotal + getTotal(member.orders);
    }
    setTotal(curTotal);
    localStorage.setItem("memberList", JSON.stringify(memberList));
  }, [memberList]);

  useEffect(() => {
    localStorage.setItem("title", title);
  }, [title]);

  useEffect(() => {
    localStorage.setItem("deliveryList", JSON.stringify(deliveryList));
  }, [deliveryList]);

  useEffect(() => {
    if (clearConfirmed) {
      setCurrentId(1);
      setMemberList([]);
      setDeliveryList([]);
      setClearConfirmed(false);
    }
  }, [clearConfirmed]);

  return (
    <>
      <ConfirmNewModal
        visible={newModalVisible}
        setVisible={setNewModalVisible}
        setConfirmed={setClearConfirmed}
        setTitle={setTitle} />
      <ExportModal
        visible={exportModalVisible}
        setVisible={setExportModalVisible}
        title="계산서 내보내기"
        description={<>아래 내용을 복사하여 보관 후 <b>계산서 불러오기</b>로 불러오세요.</>}
        exportText={JSON.stringify(memberList)} />
      <MenuModal
        visible={menuModalVisible}
        setVisible={setMenuModalVisible} />
      <Navbar ref={navBarRef} title={title} total={total} managementMenus={managementMenus} />
      <div
        style={{
          overflowX: 'hidden',
          overflowY: 'auto',
          height: bodyHeight
        }}>
        <MemberList memberList={memberList} setMemberList={setMemberList} />
        <CRow xs={{ gutterX: 2 }} className="align-items-center">
          <CCol
            xs="auto"
            style={{ padding: '1rem', marginLeft: '0.75rem' }}
            onClick={() => setMemberAddModalVisible(true)}>
            <CIcon
              icon={cilUserPlus}
              size="xl"
              style={{ color: 'grey' }} />
          </CCol>
          <CCol xs="auto"
            onClick={() => setMemberAddModalVisible(true)}>
            멤버 추가
          </CCol>
        </CRow>
      </div>
      <CContainer
        ref={tabBarRef}
        style={{
          borderTop: '1px solid var(--cui-border-color)',
          bottom: '0px',
          position: 'fixed',
          maxWidth: 'none',
          zIndex: '1024'
        }}>
        <CRow>
          <CCol
            style={{
              height: '4rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#00c4bd',
              borderRight: '1px solid var(--cui-border-color)'
            }}
            onClick={() => setDeliveryModalVisible(true)}>
            <CImage src={deliveryIcon} style={{ width: "40px", height: "40px" }} />
            <div style={{ marginLeft: '0.5rem', fontSize: '1.125rem', color: 'white' }}>
              외부 음식
            </div>
          </CCol>
          <CCol
            style={{
              height: '4rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'var(--cui-info)'
            }}
            onClick={() => setExportTextModalVisible(true)}>
            <CIcon
              icon={cilShare}
              size="xxl"
              style={{ color: 'white' }} />
            <div style={{ marginLeft: '0.5rem', fontSize: '1.125rem', color: 'white' }}>
              정산하기
            </div>
          </CCol>
        </CRow>
      </CContainer>
      <ExportModal
        visible={exportTextModalVisible}
        setVisible={setExportTextModalVisible}
        title="정산하기"
        description="아래 내용을 복사하여 정산하세요."
        exportText={makeBill(title, memberList, deliveryList)} />
      <MemberAddModal
        visible={memberAddModalVisible}
        setVisible={setMemberAddModalVisible}
        memberAdder={memberAdder(currentId, setCurrentId, memberList, setMemberList)} />
      <DeliveryModal
        visible={deliveryModalVisible}
        setVisible={setDeliveryModalVisible}
        currentId={currentDeliveryId}
        setCurrentId={setCurrentDeliveryId}
        deliveryList={deliveryList}
        setDeliveryList={setDeliveryList}
        memberList={memberList}
        setMemberList={setMemberList} />
    </>
  );
}

export default App;
