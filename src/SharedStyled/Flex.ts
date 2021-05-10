import styled from "styled-components";

// TODO: styled 없이 사용 불가능
// styled(FlexCenter("div"))``
// TODO: keyof JSX.IntrinsicElements => 너무 느림 / type 최적화?
const FlexCenter = (tagName: "div" | "label") => styled[tagName]`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlexBetween = (tagName: "div" | "label") => styled[tagName]`
  display: flex;
  justify-content: space-between;
`;

export { FlexCenter, FlexBetween };
