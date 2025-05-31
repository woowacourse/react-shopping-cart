import styled from '@emotion/styled';

type Props = {
  message: string;
  status: 'error' | 'success';
};

export default function Toast({message, status}: Props) {
  return <ToastWrapper status={status}>{message}</ToastWrapper>;
}

export const ToastWrapper = styled.div<Pick<Props, 'status'>>`
  width: 100%;
  height: 45px;
  background-color: ${({status}) =>
    status === 'error' ? '#ffc9c9' : '#5ef575'};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  position: fixed;
  z-index: 1;

  animation: fadeAnimation 0.5s ease-out;

  @keyframes fadeAnimation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
