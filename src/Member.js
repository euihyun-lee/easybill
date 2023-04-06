import "@coreui/coreui/dist/css/coreui.min.css";
import { CAccordionItem, CAccordionHeader, CAccordionBody } from "@coreui/react";

function Member({ id, name }) {
  return (
    <CAccordionItem itemkey={id}>
      <CAccordionHeader>{name}</CAccordionHeader>
      <CAccordionBody>
        Placeholder
      </CAccordionBody>
    </CAccordionItem>
  );
}

export default Member;
