import styled from "styled-components";

const FlexCenter = (tagName: keyof JSX.IntrinsicElements) => styled[tagName]`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlexBetween = (tagName: keyof JSX.IntrinsicElements) => styled[tagName]`
  display: flex;
  justify-content: space-between;
`;

const DivFlexBetween = FlexBetween("div");

export { FlexCenter, FlexBetween, DivFlexBetween };
