import styled from "styled-components";

export const StyledConfirmButton = styled.button<{ backgroundColor?: string }>`
  width: 100%;
  height: 64px;
  top: 872px;
  padding: 24px 65px;
  background-color: ${({ backgroundColor }) =>
    backgroundColor || "rgba(0, 0, 0, 1)"};
  border: none;
  border-radius: 0px;

  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  text-align: center;
  color: rgba(255, 255, 255, 1);

  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
