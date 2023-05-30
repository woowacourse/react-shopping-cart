import { css, keyframes, styled } from 'styled-components';
import { createPortal } from 'react-dom';

interface Props {
  isShowToast?: boolean;
  message: string;
  dismissToast: () => void;
}

const Toast = ({ isShowToast = false, message, dismissToast }: Props) => {
  if (isShowToast) {
    setTimeout(() => {
      dismissToast();
    }, 1500);
  }

  return createPortal(<S.Toast isShowToast={isShowToast}>{message}</S.Toast>, document.body);
};

const toastAnimation = keyframes` 
  0% {
    opacity: 0;
  }
  50%{
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const S = {
  Toast: styled.div<{ isShowToast: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    width: calc(100vw - 70vw);
    min-width: 130px;
    height: 50px;
    left: 35%;
    bottom: 100px;
    color: #fff;
    font-size: 18px;
    background-color: #04c09e;
    border-radius: 7px;

    ${({ isShowToast }) => {
      return isShowToast
        ? css`
            display: flex;
            animation: ${toastAnimation} 2s forwards;
          `
        : css`
            display: none;
          `;
    }}
  `,
};

export default Toast;
