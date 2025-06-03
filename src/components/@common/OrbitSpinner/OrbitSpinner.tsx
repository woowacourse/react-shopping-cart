import { css, keyframes } from "@emotion/css";

const OrbitSpinner = () => (
  <div className={spinnerContainerStyle} data-testid="loading-spinner">
    <div className={orbitSpinnerStyle} data-testid="progress-indicator">
      <div className={planetStyle} />
      <div className={orbitStyle}>
        <div className={`${satelliteStyle} ${satellite1Style}`} />
        <div className={`${satelliteStyle} ${satellite2Style}`} />
      </div>
    </div>
  </div>
);

export default OrbitSpinner;

const orbitSpin = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const spinnerContainerStyle = css`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const orbitSpinnerStyle = css`
  position: relative;
  width: 50px;
  height: 50px;
`;

const planetStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40%;
  height: 40%;
  background-color: black;
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;

const orbitStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px solid black;
  animation: ${orbitSpin} 2s linear infinite;
  width: 100%;
  height: 100%;
`;

const satelliteStyle = css`
  position: absolute;
  width: 22%;
  height: 22%;
  background-color: black;
  border-radius: 50%;
`;

const satellite1Style = css`
  top: 25%;
  right: -10%;
`;

const satellite2Style = css`
  bottom: 25%;
  left: -10%;
`;
