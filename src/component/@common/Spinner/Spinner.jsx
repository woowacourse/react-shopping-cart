import styled from 'styled-components';

const SpinnerBox = styled.div`
  animation: loading_spin 2s linear infinite;
  transform-origin: 50% 50%;

  @keyframes loading_spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

function Spinner({ children }) {
  return <SpinnerBox>{children}</SpinnerBox>;
}

export default Spinner;
