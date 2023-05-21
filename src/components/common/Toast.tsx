import { styled, css, keyframes } from 'styled-components';

interface Props {
  isOpenToast: boolean;
  closeToast: () => void;
  message: string;
}

export default function Toast({ isOpenToast = false, closeToast, message }: Props) {
  if (isOpenToast) {
    setTimeout(() => {
      closeToast();
    }, 2000);
  }

  return <Style.Wrapper isOpenToast={isOpenToast}>{message}</Style.Wrapper>;
}

const ShowAndHide = keyframes` 
  0% {
    opacity: 0;
  }
  70%{
    opacity: 1;
  }
  80%{
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Style = {
  Wrapper: styled.div<{ isOpenToast: boolean }>`
    justify-content: center;
    align-items: center;

    width: 300px;
    height: 50px;

    position: fixed;
    top: 90%;
    left: 50%;
    transform: translateX(-50%);
    border: none;
    border-radius: 7px;
    background-color: var(--toast-box-color);

    font-size: 14px;
    color: var(--grey-100);

    z-index: 1000;

    ${({ isOpenToast }) => {
      return isOpenToast
        ? css`
            display: flex;
            animation: ${ShowAndHide} 2s forwards;
          `
        : css`
            display: none;
          `;
    }}
  `,
};
