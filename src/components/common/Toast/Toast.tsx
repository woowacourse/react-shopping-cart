import { useEffect, useRef } from 'react';
import { css, keyframes, styled } from 'styled-components';
import useToast from './useToast';

export interface ToastProps {
  id: string;
  status?: 'success' | 'error';
  message: string;
  isActive: boolean;
}

const Toast = ({ id, status = 'success', message, isActive }: ToastProps) => {
  const { closeToast } = useToast();
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive || toastRef.current === null) {
      return;
    }

    toastRef.current.getAnimations().forEach((animation) => {
      animation.onfinish = () => closeToast(id);
    });
  }, [isActive]);

  return (
    <Container id={id} ref={toastRef} status={status} $isActive={isActive}>
      <Message>{message}</Message>
    </Container>
  );
};

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3D(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const Container = styled.div<{
  status: ToastProps['status'];
  $isActive: ToastProps['isActive'];
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  border-radius: 4px;
  width: 250px;

  ${({ $isActive }) =>
    $isActive
      ? css`
          animation: 0.3s ease-in ${fadeInUp} both;
        `
      : css`
          animation: 0.3s ease-in ${fadeOut} both;
        `}

  background-color: ${({ status }) => {
    if (status === 'success') {
      return '#000';
    }

    if (status === 'error') {
      return '#e53e53';
    }
  }};
`;

const Message = styled.span`
  color: #fff;
  font-weight: 600;
`;

export default Toast;
