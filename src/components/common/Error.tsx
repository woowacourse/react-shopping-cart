import { css } from '@emotion/react';
// import { useNavigate } from 'react-router-dom';

import { WARNING } from '@assets/images';
import FooterButton from '@components/common/FooterButton';
// import Button from '@components/common/Button';

interface ErrorProps {
  errorMessage: string;
}

export default function Error({ errorMessage }: ErrorProps) {
  // const navigate = useNavigate();

  // const goHome = () => navigate('/');

  return (
    <>
      <main css={errorMain}>
        <div css={errorWrapper}>
          <img alt="warning" src={WARNING} />
          <span>오류가 발생했습니다.</span>
          <span css={errorInfoText}>
            페이지를 새로고침하거나
            <br />
            인터넷 연결을 다시 확인해주세요.
          </span>
          <span></span>
          <span css={errorText}>({errorMessage})</span>
        </div>
        {/* 해당 페이지에서 오류가 발생했기 때문에 페이지 이동이 안됨 페이지 이동이 안되는 현상 */}
        {/* <Button onClick={goHome} css={cartButton} id="cart-button">
          장바구니로 돌아가기
        </Button> */}
      </main>
      <FooterButton id="error-footer" isDisabled={true} />
    </>
  );
}

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

const errorText = css`
  color: tomato;
`;

const errorInfoText = css`
  display: flex;
  justify-content: center;
  align-items: center;

  color: #333;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
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
