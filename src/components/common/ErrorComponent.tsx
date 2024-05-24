import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { THEME } from '@/constants/theme';

interface ErrorComponentProps {
  error: Error;
}

const ErrorComponent = ({ error }: ErrorComponentProps) => {
  const navigate = useNavigate();

  const handleClickHomeButton = () => {
    navigate('/');
  };

  return (
    <div css={container}>
      <div>에러가 발생했습니다.</div>
      <div>에러 : {error.message}</div>
      <button css={homeButton} onClick={handleClickHomeButton}>
        홈화면으로 가기
      </button>
    </div>
  );
};

export default ErrorComponent;

const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 24px;
`;

const homeButton = css`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 8px 16px;

  background-color: ${THEME.BLACK};
`;
