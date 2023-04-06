import "@coreui/coreui/dist/css/coreui.min.css";
import { CAccordion } from "@coreui/react";

import Member from "./Member";

function MemberList({ memberList }) {
  const members = memberList.map(member =>
    <Member index={member.id} name={member.name} />
  );

  return (
    <CAccordion>{members}</CAccordion>
  );
}

export default MemberList;
