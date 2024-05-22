import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { THEME } from '@/constants/theme';

const ReturnCartButton = () => {
  const navigate = useNavigate();

  const handleClickPurchase = () => {
    navigate('/');
  };

  return (
    <button css={returnCartButton} onClick={handleClickPurchase}>
      장바구니로 돌아가기
    </button>
  );
};

export default ReturnCartButton;

const returnCartButton = css`
  width: 100%;
  height: 64px;

  background-color: ${THEME.BLACK};

  font-size: 16px;
  font-weight: 700;
  color: ${THEME.WHITE};
`;
