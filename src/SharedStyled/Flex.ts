import styled from "styled-components";

type Tag = "div" | "section";

const FlexCenter = (tagName: Tag) => styled[tagName]`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlexBetween = (tagName: Tag) => styled[tagName]`
  display: flex;
  justify-content: space-between;
`;

const DivFlexCenter = FlexCenter("div");
const DivFlexBetween = FlexBetween("div");

export { FlexCenter, FlexBetween, DivFlexCenter, DivFlexBetween };
