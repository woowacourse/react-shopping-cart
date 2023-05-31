import styled, { keyframes } from "styled-components";
import spinner from "../../../assets/images/spinner.png";

const Loading = () => {
  return <LoadingImage src={spinner} />;
};

const SpinAnimation = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const LoadingImage = styled.img`
  position: fixed;
  width: 55px;
  animation: ${SpinAnimation} 3s infinite linear;
  left: 50%;
  top: 50%;
`;

export default Loading;
