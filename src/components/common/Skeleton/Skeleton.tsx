import { keyframes, styled } from 'styled-components';

const Skeleton = () => {
  return <Wrapper />;
};

const loading = keyframes`
  0% {
		transform: translateX(-100%);
	}
	50% {
		transform: translateX(100%);
	}
	100% {
		transform: translateX(100%);
	}
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.09);

  &::after {
    animation: ${loading} 1.5s linear 0.5s infinite;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 0, 0, 0.09),
      transparent
    );
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

export default Skeleton;
