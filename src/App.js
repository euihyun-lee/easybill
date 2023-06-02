import React, { useState } from "react";

import Navbar from "./Navbar";
import Menu from "./Menu";
import MemberList from "./MemberList";
import AddButton from "./AddButton";
import MemberAdder from "./MemberAdder";

function App() {
  const [currentId, setCurrentId] = useState(1);
  const [memberList, setMemberList] = useState([]);

  return (
    <>
      <Navbar />
      <MemberList memberList={memberList} />
      <AddButton rowAdder={MemberAdder(currentId, setCurrentId, memberList, setMemberList)} />
    </>
  );
}

export default App;
