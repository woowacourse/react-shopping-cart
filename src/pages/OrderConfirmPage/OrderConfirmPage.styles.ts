import styled from "styled-components";

const Wrapper = styled.div`
  height: calc(100vh - 128px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 20px;
`;

export const ButtonText = styled.span`
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
`;

const Styled = {
  Wrapper,
  ButtonText,
};

export default Styled;
