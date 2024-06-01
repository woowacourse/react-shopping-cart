import styled from '@emotion/styled';
import { BottomButtonProps } from '.';

export const Button = styled.button<Pick<BottomButtonProps, 'active'>>`
  width: 100%;
  height: 64px;
  background: ${({ theme, active }) =>
    active ? theme.colors.black : theme.colors.gray};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border: none;
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
`;
