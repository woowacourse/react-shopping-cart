import { css, keyframes } from '@emotion/react';

import FooterButton from '@components/common/FooterButton';

export default function Loading() {
  return (
    <>
      <main css={loadingMain}>
        <div css={loader}>
          <li css={ball}></li>
          <li css={ball}></li>
          <li css={ball}></li>
        </div>
        <span>Loading</span>
      </main>
      <FooterButton isDisabled={true} />
    </>
  );
}

const loadingMain = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 20px;
`;

const loader = css`
  display: flex;
  justify-content: space-evenly;

  width: 60px;
`;

const bounce = keyframes`
  50% {
    transform: translateY(-90px);
    scale: 0.3;
  }
`;

const ball = css`
  list-style: none;

  width: 12px;
  height: 12px;

  border-radius: 50%;

  background-color: #333;

  &:nth-of-type(1) {
    animation: ${bounce} 2.1s ease-in-out infinite;
  }

  &:nth-of-type(2) {
    animation: ${bounce} 2.1s ease-in-out 0.3s infinite;
  }

  &:nth-of-type(3) {
    animation: ${bounce} 2.1s ease-in-out 0.6s infinite;
  }
`;
