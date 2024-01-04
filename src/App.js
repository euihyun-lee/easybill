import "@coreui/coreui/dist/css/coreui.min.css";
import { useState, useEffect } from "react";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPlus } from "@coreui/icons";

import Navbar from "./Navbar";
import Menu from "./Menu";
import MemberList from "./MemberList";
import Member from "./Member";

import ConfirmNewModal from "./modals/NewModal";
import ExportModal from "./modals/ExportModal";
import MemberAddModal from "./modals/MemberAddModal";

function App() {
  const [title, setTitle] = useState(() => {
    let localData = localStorage.getItem("title");
    if (localData !== null) return localData;
    return "푸른하늘";
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
  const [memberSetterList, setMemberSetterList] = useState([]);
  const [total, setTotal] = useState(0);
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [clearConfirmed, setClearConfirmed] = useState(false);
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [memberAddModalVisible, setMemberAddModalVisible] = useState(false);

  const memberAdder = memberName => {
    setMemberList(memberList.concat(new Member(currentId, memberName)));
    setCurrentId(currentId + 1);
  };

  const managementMenus = [
    { text: "새 계산서",
      func: () => setNewModalVisible(true) },
    { text: "계산서 내보내기",
      func: () => setExportModalVisible(true) },
    { text: "계산서 불러오기", func: () => {} },
    { text: "메뉴 보기", func: () => {} },
    { text: "메뉴 내보내기", func: () => {} },
    { text: "메뉴 불러오기", func: () => {} }
  ];

  useEffect(() => {
    let curTotal = 0;
    for (let member of memberList) {
      let memberTotal = 0;
      for (let order of member.orders) {
        memberTotal = memberTotal + order.cost * order.amount;
      }
      curTotal = curTotal + memberTotal;
    }
    setTotal(curTotal);
    localStorage.setItem("title", title);
    localStorage.setItem("memberList", JSON.stringify(memberList));
  }, [memberList]);

  useEffect(() => {
    if (clearConfirmed) {
      setMemberList([]);
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
        exportText={JSON.stringify(memberList)} />
      <Navbar title={title} total={total} managementMenus={managementMenus} />
      <MemberList memberList={memberList} setMemberList={setMemberList} />
      <CButton
        color="info"
        size="xxl"
        style={{
          width: '4rem',
          height: '4rem',
          '--cui-btn-border-radius': '2rem',
          bottom: '1.5rem',
          right: '1.5rem',
          position: 'absolute',
          zIndex: '1024' }}
        onClick={() => setMemberAddModalVisible(true)}>
        <CIcon
          icon={cilPlus}
          size="xxl"
          style={{ '--ci-primary-color': 'white' }} />
      </CButton>
      <MemberAddModal
        visible={memberAddModalVisible}
        setVisible={setMemberAddModalVisible}
        memberAdder={memberAdder} />
    </>
  );
}

export default App;
