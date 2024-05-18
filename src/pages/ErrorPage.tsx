import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { WARNING } from '@/assets/images';
import Button from '@/components/common/Button';
import FooterButton from '@components/common/FooterButton';

import Header from '@components/Header';

export default function ErrorPage() {
  const navigate = useNavigate();

  const goHome = () => navigate('/');

  return (
    <>
      <Header>
        <Button id="return-home" onClick={goHome} css={homeButton}>
          <h1>SHOP</h1>
        </Button>
      </Header>
      <main css={errorMain}>
        <div css={errorWrapper}>
          <img alt="warning" src={WARNING} />
          <span>알 수 없는 오류가 발생했습니다.</span>
        </div>
        <Button onClick={goHome} css={cartButton} id="cart-button">
          장바구니로 돌아가기
        </Button>
      </main>
      <FooterButton id="loading" isDisabled={true} />
    </>
  );
}

const homeButton = css`
  height: 100%;

  padding-left: 24px;

  background-color: inherit;

  font-size: 20px;
  font-weight: 800;
  color: #fff;
`;

const errorMain = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 20px;
`;

const errorWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const cartButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;

  padding: 12px 8px;

  color: #fff;
  border-radius: 8px;

  background-color: #000;

  font-size: 20px;
  font-weight: 700;

  &:hover {
    opacity: 0.7;
  }
`;
