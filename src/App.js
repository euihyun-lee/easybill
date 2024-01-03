import React, { useState, useEffect } from "react";
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from "@coreui/react";
import { CButton } from "@coreui/react";

import Navbar from "./Navbar";
import Menu from "./Menu";
import MemberList from "./MemberList";
import AddButton from "./AddButton";
import Member from "./Member";

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

  const memberAdder = memberName => {
    setMemberList(memberList.concat(new Member(currentId, memberName)));
    setCurrentId(currentId + 1);
  }

  const managementMenus = [
    { text: "새 계산서",
      func: () => {
        setClearModalVisible(true);
      }
    },
    { text: "계산서 내보내기", func: () => {} },
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
      <CModal
        visible={clearModalVisible}
        onClose={() => setClearModalVisible(false)}>
        <CModalHeader onClose={() => setClearModalVisible(false)}>
          <CModalTitle>새 계산서</CModalTitle>
        </CModalHeader>
        <CModalBody>
          현재 내역을 모두 지우고 새 계산서를 준비합니다.<br/>
          확실합니까?
        </CModalBody>
        <CModalFooter>
          <CButton
            color="primary"
            onClick={() => {
              setClearConfirmed(true);
              setClearModalVisible(false);}}>
            예
          </CButton>
          <CButton
            color="secondary"
            onClick={() => setClearModalVisible(false)}>
            아니오
          </CButton>
        </CModalFooter>
      </CModal>
      <Navbar title={title} total={total} managementMenus={managementMenus} />
      <MemberList memberList={memberList} setMemberList={setMemberList} />
      <AddButton memberAdder={memberAdder} />
    </>
  );
}

export default App;
