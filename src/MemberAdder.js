import "@coreui/coreui/dist/css/coreui.min.css";

import Member from "./Member";

function MemberAdder(currentId, setCurrentId, memberList, setMemberList) {
  return (memberName) => {
    setMemberList(memberList.concat(new Member(currentId, memberName)));
    setCurrentId(currentId + 1);
  }
}

export default MemberAdder;
