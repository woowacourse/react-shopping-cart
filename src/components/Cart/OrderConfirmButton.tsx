import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { THEME } from '@/constants/theme';
import { isAllUnCheckedState } from '@recoil/cartItems/selectors';

export default function OrderConfirmButton() {
  const navigate = useNavigate();
  const isAllUnChecked = useRecoilValue(isAllUnCheckedState);

  const handleClickOrderConfirm = () => {
    if (isAllUnChecked) return;

    navigate('/confirm');
  };

  return (
    <button
      css={orderConfirmButton(isAllUnChecked)}
      onClick={handleClickOrderConfirm}
      disabled={isAllUnChecked}
    >
      주문확인
    </button>
  );
}

const orderConfirmButton = (isDisabled: boolean) => css`
  width: 100%;
  height: 64px;

  background-color: ${isDisabled ? THEME.DISABLED : THEME.BLACK};

  font-size: 16px;
  font-weight: 700;
  color: ${THEME.WHITE};
`;
