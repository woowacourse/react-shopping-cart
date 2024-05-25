import styled from "styled-components";

const ButtonText = styled.span`
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
`;

const BottomFixedButton = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 430px;
  margin: 0;
`;

const Styled = {
  ButtonText,
  BottomFixedButton,
};

export default Styled;
