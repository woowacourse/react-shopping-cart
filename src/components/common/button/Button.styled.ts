import styled from 'styled-components';

export const StyledButton = styled.button`
  display: flex;
  background-color: transparent;
  border: none;
  padding: 0;

  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export const StyledButtonImg = styled.img`
  width: 24px;
  height: 24px;
`;

export const StyledButtonText = styled.span`
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
