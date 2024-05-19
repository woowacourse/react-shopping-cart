import styled from "styled-components";

export const StyledDeleteButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;

  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const StyledDeleteButtonText = styled.span`
  width: 40px;
  height: 24px;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);

  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
  color: rgba(10, 13, 19, 1);
`;
