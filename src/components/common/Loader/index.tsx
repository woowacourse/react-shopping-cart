import styled, { keyframes } from 'styled-components';

const Loader = () => {
  return (
    <CardLoaderBackWrapper>
      <CardLoaderWrapper />
    </CardLoaderBackWrapper>
  );
};

const Rotate = keyframes`
 0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const CardLoaderBackWrapper = styled.div`
  border-radius: 10px;
  margin-top: 25vh;
`;

const CardLoaderWrapper = styled.div`
  border: 10px solid #f3f3f3;
  border-top: 10px solid #3498db;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: ${Rotate} 1s linear infinite;
`;
export default Loader;
