import styled from 'styled-components';

import { fadeIn, fadeOut, moveUp } from '../../../styles/animations';
import { ToastProps } from './Toast';

const ToastWrapper = styled.div<ToastProps>`
  position: fixed;
  left: 50%;
  bottom: ${({ theme }) => theme.spacer.spacing6};
  min-width: 300px;
  padding: ${({ theme }) => theme.spacer.spacing3} ${({ theme }) => theme.spacer.spacing4};
  background-color: ${({ status, theme }) =>
    status === 'success' ? theme.color.gray6 : theme.color.darkRed};
  color: ${({ theme }) => theme.color.white};
  font-weight: 600;
  text-align: center;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  animation: ${fadeIn} 0.2s ease-in, ${moveUp} 0.2s ease-in;
  box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
  transform: translateX(-50%) translateY(0%);

  &.hide {
    animation: ${fadeOut} 0.2s ease-in forwards;
  }
`;

export { ToastWrapper };
