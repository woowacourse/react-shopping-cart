import styled from "@emotion/styled";

export const FooterButton = styled.button`
  display: flex;
  position: relative;
  background-color: #000;
  width: 100%;
  height: 64px;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  font-weight: 700;
  font-size: 18px;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: rgb(35, 35, 35);
  }

  &:disabled {
    background-color: rgb(208, 208, 208);
    cursor: default;
  }
`;
