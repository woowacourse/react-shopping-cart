import styled from 'styled-components';

const StyledSpinner = styled.div`
  animation: loading_spin 2s linear infinite;
  transform-origin: 50% 50%;

  @keyframes loading_spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

function Spinner({ children }) {
  return <StyledSpinner>{children}</StyledSpinner>;
}

export default Spinner;
