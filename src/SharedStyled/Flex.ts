import styled from "styled-components";

type TagNames =
  | "body"
  | "header"
  | "main"
  | "footer"
  | "div"
  | "span"
  | "form"
  | "section"
  | "nav"
  | "article"
  | "input"
  | "label"
  | "a";

// TODO: styled 없이 사용 불가능
// styled(FlexCenter("div"))``
const FlexCenter = (tagName: TagNames) => styled[tagName]`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlexBetween = (tagName: TagNames) => styled[tagName]`
  display: flex;
  justify-content: space-between;
`;

export { FlexCenter, FlexBetween };
