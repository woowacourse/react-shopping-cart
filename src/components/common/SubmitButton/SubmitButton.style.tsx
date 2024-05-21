import styled from 'styled-components';
import theme from '../../../styles/theme';

export const ButtonWrapper = styled.button<{ $isActive: boolean }>`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: ${theme.boxHeight};
  color: white;
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.bold};
  text-align: center;
  background-color: ${(props) => (props.$isActive ? theme.color.primary.main : theme.color.primary.light)};
`;
