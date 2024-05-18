import { css, keyframes } from '@emotion/react';

import FooterButton from '@components/common/FooterButton';

import Header from '@components/Header';

export default function LoadingPage() {
  return (
    <>
      <Header></Header>
      <main css={loadingMain}>
        <div css={loader}>
          <li css={ball}></li>
          <li css={ball}></li>
          <li css={ball}></li>
        </div>
        <span>Loading</span>
      </main>
      <FooterButton id="loading" isDisabled={true} />
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

  &:nth-child(1) {
    animation: ${bounce} 2.1s ease-in-out infinite;
  }

  &:nth-child(2) {
    animation: ${bounce} 2.1s ease-in-out 0.3s infinite;
  }

  &:nth-child(3) {
    animation: ${bounce} 2.1s ease-in-out 0.6s infinite;
  }
`;
