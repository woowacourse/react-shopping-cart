import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onLater: () => void;
  time?: number;
}

const Toast = ({ message, onLater, time = 2500 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLater();
    }, time);

    return () => clearTimeout(timer);
  }, [onLater, time]);

  return (
    <S.Container>
      <p>{message}</p>
    </S.Container>
  );
};

export default Toast;

const active = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }

  10% {
    transform: translateY(0%);
    opacity: 1;
  }

  90% {
    transform: translateY(0%);
    opacity: 1;
  }

  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const S = {
  Container: styled.div`
    position: absolute;
    top: 64px;
    left: 0px;
    width: 100%;
    background-color: #8ddca4;
    text-align: center;
    color: #0a0d13;
    padding: 12px 0px;
    font-size: 12px;
    font-weight: 500;
    animation: ${active} 2s ease forwards;
    z-index: 100;
  `,
};
