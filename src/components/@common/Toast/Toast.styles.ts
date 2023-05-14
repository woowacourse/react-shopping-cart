import { styled, keyframes, css } from 'styled-components';

const fadeInUp = keyframes`
  0% {
    transform: translateX(-50%) translateY(50%);
    opacity:0;
    }
  100% {
    transform: translateX(-50%) translateY(0%);
    opacity:1;
  }    
`;

const fadeOut = keyframes`
  from {
    transform: translateX(-50%) translateY(0%);
    opacity: 1;
  }
  to {
    transform: translateX(-50%) translateY(0%);
    opacity: 0;
  }
`;

export const ToastContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translate(-50%, 0);
`;

export const ToastWrapper = styled.div<{
  type: 'error' | 'success';
  $isShown: boolean;
}>`
  position: relative;
  left: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  width: 300px;
  height: 48px;
  margin-bottom: 12px;

  background: ${(props) => (props.type === 'error' ? '#E53E3E' : '#37A169')};

  color: ${(props) => props.theme.color.white};
  border-radius: 10px;

  ${(props) => {
    return props.$isShown
      ? css`
          transition: transform 0.5s ease, opacity 0.5s ease;
          animation: ${fadeInUp} 0.5s ease-in-out forwards;
        `
      : css`
          animation: ${fadeOut} 0.5s linear forwards;
        `;
  }}
`;
