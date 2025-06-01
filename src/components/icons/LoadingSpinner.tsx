import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const LoadingSpinnerContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const orbitSpin = keyframes`
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
`;

const OrbitSpinner = styled.div`
  position: relative;
  z-index: 1;
  width: 50px;
  height: 50px;
`;

const Planet = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40%;
  height: 40%;
  background-color: #000;
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;

const Orbit = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px solid #000;
  animation: ${orbitSpin} 2s linear infinite;
  width: 100%;
  height: 100%;
`;

const Satellite = styled.div`
  position: absolute;
  width: 22%;
  height: 22%;
  background-color: #000;
  border-radius: 50%;
`;

const Satellite1 = styled(Satellite)`
  top: 25%;
  right: -10%;
`;

const Satellite2 = styled(Satellite)`
  bottom: 25%;
  left: -10%;
`;

function LoadingSpinner() {
  return (
    <LoadingSpinnerContainer role="status" aria-label="로딩 중">
      <OrbitSpinner>
        <Planet />
        <Orbit>
          <Satellite1 />
          <Satellite2 />
        </Orbit>
      </OrbitSpinner>
    </LoadingSpinnerContainer>
  );
}

export default LoadingSpinner;
