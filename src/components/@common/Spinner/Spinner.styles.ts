import { keyframes, styled } from 'styled-components';

const spinner = keyframes`
0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

export const SpinnerContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 8px solid #f3f3f3;
    border-top: 8px solid ${(props) => props.theme.color.secondary};
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: ${spinner} 2s linear infinite;
    z-index: 1;
  }    
`;
