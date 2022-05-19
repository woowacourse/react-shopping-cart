import { FRUITS } from 'constant';
import styled from 'styled-components';

const SpinnerBox = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 50%;
  transform: translateX(-50%);
`;

const Icon = styled.div`
  animation: loading_spin 2s linear infinite;
  transform-origin: 50% 50%;

  @keyframes loading_spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

function LoadingSpinner() {
  return (
    <SpinnerBox>
      {FRUITS.map(fruit => (
        <Icon key={fruit}>
          <span style={{ fontSize: '50px' }}>{fruit}</span>
        </Icon>
      ))}
    </SpinnerBox>
  );
}

export default LoadingSpinner;
