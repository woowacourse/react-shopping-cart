import styled from "styled-components";

export const StyledBaseButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;

  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    outline: none;
  }
`;

export const StyledBaseButtonImg = styled.img`
  width: 24px;
  height: 24px;
`;
