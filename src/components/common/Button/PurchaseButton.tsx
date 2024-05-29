import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { orderProductList } from '@/apis/order';
import { THEME } from '@/constants/theme';
import { checkedCartItemsState, totalPurchasePriceState } from '@/recoil/cartItems/selectors';
import { couponChecklistSelector } from '@/recoil/coupons/selectors';

const PurchaseButton = () => {
  const navigate = useNavigate();

  const totalPurchasePrice = useRecoilValue(totalPurchasePriceState);
  const resetCouponCheckList = useResetRecoilState(couponChecklistSelector);
  const checkedCartItems = useRecoilValue(checkedCartItemsState);
  const cartItemIds = checkedCartItems.map((cartItem) => cartItem.id);

  const handleClickPurchase = async () => {
    try {
      const { status } = await orderProductList(cartItemIds);

      if (status === 201) {
        resetCouponCheckList();
        localStorage.clear();
        navigate('/completed', { state: totalPurchasePrice });
      }
    } catch (err: unknown) {
      const error = err as Error;
      throw new Error(error.message);
    }
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
