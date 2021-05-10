import styled from "styled-components";

// TODO: styled 없이 사용 불가능
// styled(FlexCenter("div"))``
const FlexCenter = (tagName: keyof JSX.IntrinsicElements) => styled[tagName]`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlexBetween = (tagName: keyof JSX.IntrinsicElements) => styled[tagName]`
  display: flex;
  justify-content: space-between;
`;

export { FlexCenter, FlexBetween };
