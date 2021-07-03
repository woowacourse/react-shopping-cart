import styled from "styled-components";

// keyof JSX.IntrinsicElements

const FlexCenter = (tagName: "div") => styled[tagName]`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlexBetween = (tagName: "div") => styled[tagName]`
  display: flex;
  justify-content: space-between;
`;

const DivFlexBetween = FlexBetween("div");

export { FlexCenter, FlexBetween, DivFlexBetween };
