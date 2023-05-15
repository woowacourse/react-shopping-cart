import { styled, keyframes } from 'styled-components';

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
    transform: translateX(-50%) translateY(50%);
    opacity: 0;
  }
`;

export const ToastWrapper = styled.div<{ type: 'error' | 'success' , isShow:boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  min-width: 300px;
  height: 48px;
  padding: 0 10px;

  background: ${(props) => (props.type === 'error' ? '#E53E3E' : '#37A169')};

  color: ${(props) => props.theme.color.white};
  border-radius: 10px;

  transition: transform 0.3s ease, opacity 0.3s ease;
  animation: ${(props) => props.isShow ? fadeInUp : fadeOut} 0.3s ease-in-out forwards;
}
`;
