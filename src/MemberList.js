import "@coreui/coreui/dist/css/coreui.min.css";
import { CAccordion } from "@coreui/react";

import MemberItem from "./MemberItem";

function MemberList({ memberList, setMemberList }) {
  const memberRemover = target => {
    return () => {
      let idx = memberList.findIndex(function(member) {return member.id === target.id});
      if (idx > -1) {
        let newMemberList = [...memberList];
        newMemberList.splice(idx, 1);
	setMemberList(newMemberList);
      }
    }
  }
  const memberItems = memberList.map(member =>
    <MemberItem
      member={member}
      memberRemover={memberRemover(member)} />
  );

  return (
    <CAccordion alwaysOpen>{memberItems}</CAccordion>
  );
}

export default MemberList;
