import styled from 'styled-components';

function Spinner() {
  return <SpinnerWrapper />;
}

export default Spinner;

const SpinnerWrapper = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
