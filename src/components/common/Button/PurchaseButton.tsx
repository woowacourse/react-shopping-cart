import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { THEME } from '@/constants/theme';

const PurchaseButton = () => {
  const navigate = useNavigate();

  const handleClickPurchase = () => {
    navigate('/completed');
  };

  return (
    <button css={purchaseButton} onClick={handleClickPurchase}>
      결제하기
    </button>
  );
};

export default PurchaseButton;

const purchaseButton = css`
  width: 100%;
  height: 64px;

  background-color: ${THEME.BLACK};

  font-size: 16px;
  font-weight: 700;
  color: ${THEME.WHITE};
`;
