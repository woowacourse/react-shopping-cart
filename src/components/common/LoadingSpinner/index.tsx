import styled from "styled-components";

const LoadingSpinner = () => {
  return <SpinnerContainer />;
};

export default LoadingSpinner;

const SpinnerContainer = styled.span`
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
`;
