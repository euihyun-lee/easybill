import React, { useState } from "react";

import Navbar from "./Navbar";
import Menu from "./Menu";
import MemberList from "./MemberList";
import AddButton from "./AddButton";
import Member from "./Member";

function App() {
  const [currentId, setCurrentId] = useState(1);
  const [memberList, setMemberList] = useState([]);
  const [memberSetterList, setMemberSetterList] = useState([]);

  const memberAdder = memberName => {
    setMemberList(memberList.concat(new Member(currentId, memberName)));
    setCurrentId(currentId + 1);
  }

  return (
    <>
      <Navbar />
      <MemberList memberList={memberList} setMemberList={setMemberList} />
      <AddButton memberAdder={memberAdder} />
    </>
  );
}

export default App;
