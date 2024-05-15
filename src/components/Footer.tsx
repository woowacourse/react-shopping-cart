import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { isAllUnCheckedState } from '@recoil/cartItems';

export default function Footer() {
  const navigate = useNavigate();
  const isAllUnChecked = useRecoilValue(isAllUnCheckedState);

  const handleClickOrderConfirm = () => {
    if (isAllUnChecked) return;

    navigate('/confirm');
  };

  return (
    <footer css={footer}>
      <button
        css={orderConfirmButton(isAllUnChecked)}
        onClick={handleClickOrderConfirm}
        disabled={isAllUnChecked}
      >
        주문확인
      </button>
    </footer>
  );
}

const orderConfirmButton = (isDisabled: boolean) => css`
  width: 100%;
  height: 100%;

  background-color: ${isDisabled ? '#BEBEBE' : '#000'};

  font-size: 16px;
  font-weight: 700;
  color: #fff;
`;

const footer = css`
  width: 100%;
  height: 64px;
`;
