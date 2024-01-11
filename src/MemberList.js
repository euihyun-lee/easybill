import "@coreui/coreui/dist/css/coreui.min.css";
import { CAccordion } from "@coreui/react";

import Member from "./Member";
import MemberItem from "./MemberItem";

function MemberList({ memberList, setMemberList }) {
  const ordersSetter = target => {
    return orders => {
      let idx = memberList.findIndex(function(member) {return member.id === target.id});
      if (idx > -1) {
        let newMemberList = [...memberList];
        let newMember = new Member(target.id, target.name);
        newMember.orders = orders;
        newMemberList[idx] = newMember;
        setMemberList(newMemberList);
      }
    }
  }
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
      setOrders={ordersSetter(member)}
      memberRemover={memberRemover(member)} />
  );

  return (
    <CAccordion
      flush
      alwaysOpen
      style={{ borderBottom: '1px solid var(--cui-border-color)' }}>
      {memberItems}
    </CAccordion>
  );
}

export default MemberList;
