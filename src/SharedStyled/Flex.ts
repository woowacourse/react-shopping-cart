import styled from "styled-components";

type Tag = "div" | "section";
// type Tag = keyof JSX.IntrinsicElements

const FlexCenter = (tagName: Tag) => styled[tagName]`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlexBetween = (tagName: Tag) => styled[tagName]`
  display: flex;
  justify-content: space-between;
`;

const DivFlexBetween = FlexBetween("div");

export { FlexCenter, FlexBetween, DivFlexBetween };
