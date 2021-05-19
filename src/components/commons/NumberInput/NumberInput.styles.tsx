import styled from 'styled-components';

export const NumberInput = styled.div`
  display: inline-flex;
  border: 1px solid ${({ theme }) => theme.GRAY_200};
`;

export const Input = styled.input`
  box-sizing: border-box;
  width: 72px;
  height: 60px;
  display: inline;
  font-size: 24px;
  padding: 14px 20px;
  text-align: center;
  border: none;

  &:focus {
    outline: none;
  }
`;

export const TriangleButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TriangleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 30px;
  border-left: 1px solid ${({ theme }) => theme.GRAY_200};
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.GRAY_200};
  }
`;
