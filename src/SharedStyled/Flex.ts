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

const FlexCenter = (tagName: TagNames) => styled[tagName]`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { FlexCenter };
