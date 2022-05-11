import styled from "styled-components";

const NavigateButton = styled.button`
  font-weight: 500;
  font-size: 16px;
  line-height: 12px;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  :hover {
    filter: brightness(90%);
  }
`;

export default NavigateButton;
