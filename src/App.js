import "@coreui/coreui/dist/css/coreui.min.css";
import React, { useState, useEffect } from "react";
import { CButton } from "@coreui/react";

import Navbar from "./Navbar";
import Menu from "./Menu";
import MemberList from "./MemberList";
import Member from "./Member";

import ClearModal from "./modals/ClearModal";
import ExportModal from "./modals/ExportModal";
import MemberAddModal from "./modals/MemberAddModal";

function App() {
  const title = "Bluesky";
  const [currentId, setCurrentId] = useState(1);
  const [memberList, setMemberList] = useState(() => {
    let localData = localStorage.getItem("memberList");
    if (localData !== null) {
      let localMemberList = JSON.parse(localData);
      let maxId = 0;
      let newMemberList = [];
      for (let localMemberObj of localMemberList) {
        let member = Member.parse(localMemberObj);
        if (maxId < member.id) maxId = member.id;
        newMemberList.push(member);
      }
      setCurrentId(maxId + 1);
      return newMemberList;
    }
    return [];
  });
  const [memberSetterList, setMemberSetterList] = useState([]);
  const [total, setTotal] = useState(0);
  const [clearModalVisible, setClearModalVisible] = useState(false);
  const [clearConfirmed, setClearConfirmed] = useState(false);
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [memberAddModalVisible, setMemberAddModalVisible] = useState(false);

  const memberAdder = memberName => {
    setMemberList(memberList.concat(new Member(currentId, memberName)));
    setCurrentId(currentId + 1);
  }

  const managementMenus = [
    { text: "새 계산서",
      func: () => setClearModalVisible(true) },
    { text: "계산서 내보내기",
      func: () => setExportModalVisible(true) },
    { text: "계산서 불러오기", func: () => {} },
    { text: "메뉴 보기", func: () => {} },
    { text: "메뉴 내보내기", func: () => {} },
    { text: "메뉴 불러오기", func: () => {} }
  ]

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
      <ClearModal
        visible={clearModalVisible}
        setVisible={setClearModalVisible}
        setConfirmed={setClearConfirmed} />
      <ExportModal
        visible={exportModalVisible}
        setVisible={setExportModalVisible} />
      <Navbar title={title} total={total} managementMenus={managementMenus} />
      <MemberList memberList={memberList} setMemberList={setMemberList} />
      <CButton
        color="info"
        style={{ bottom: '2rem', right: '2rem', position: 'absolute', zIndex: '1024' }}
        onClick={() => setMemberAddModalVisible(true)}>
        +
      </CButton>
      <MemberAddModal
        visible={memberAddModalVisible}
        setVisible={setMemberAddModalVisible}
        memberAdder={memberAdder} />
    </>
  );
}

export default App;
