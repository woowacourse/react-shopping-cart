import styled from 'styled-components';
import theme from '../../../styles/theme';

export const ButtonWrapper = styled.button<{ $isChecked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background-color: ${(props) => (props.$isChecked ? theme.color.primary.main : 'white')};
  border: 1px solid ${(props) => (props.$isChecked ? theme.color.primary.main : theme.color.primary.light)};
  border-radius: 8px;
`;
