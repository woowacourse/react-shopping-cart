import { css } from '@emotion/react';

import { WARNING } from '@assets/images';
import FooterButton from '@components/common/FooterButton';

interface ErrorProps {
  errorMessage: string;
}

export default function Error({ errorMessage }: ErrorProps) {
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
