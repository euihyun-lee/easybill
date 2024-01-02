import React, { useState, useEffect } from "react";

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

  const memberAdder = memberName => {
    setMemberList(memberList.concat(new Member(currentId, memberName)));
    setCurrentId(currentId + 1);
  }

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

  return (
    <>
      <Navbar title={title} total={total} />
      <MemberList memberList={memberList} setMemberList={setMemberList} />
      <AddButton memberAdder={memberAdder} />
    </>
  );
}

export default App;
