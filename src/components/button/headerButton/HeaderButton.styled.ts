import styled from "styled-components";

export const StyledHeaderButtonContainer = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;

  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export const StyledHeaderButtonContent = styled.span`
  font-family: Noto Sans;
  font-size: 20px;
  font-weight: 800;
  line-height: 16px;
  text-align: left;
  color: rgba(255, 255, 255, 1);
`;

export const StyledHeaderButtonImg = styled.img`
  width: 21px;
  height: 21px;
`;
