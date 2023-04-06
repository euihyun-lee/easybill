import React, { useState } from "react";

import Navbar from "./Navbar";
import MemberList from "./MemberList";
import AddButton from "./AddButton";

function App() {
  // const [memberList, setMemberList] = useState([]);
  const memberList = [
    { id: 1, name: "John" },
    { id: 2, name: "Tim" },
  ];

  return (
    <>
      <Navbar />
      <MemberList memberList={memberList} />
      <AddButton />
    </>
  );
}

export default App;
