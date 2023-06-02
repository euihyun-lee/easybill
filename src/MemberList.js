import "@coreui/coreui/dist/css/coreui.min.css";
import { CAccordion } from "@coreui/react";

import MemberItem from "./MemberItem";

function MemberList({ memberList, setMenuVisible }) {
  const memberItems = memberList.map(member =>
    <MemberItem member={member} setMenuVisible={setMenuVisible} />
  );

  return (
    <CAccordion alwaysOpen>{memberItems}</CAccordion>
  );
}

export default MemberList;
