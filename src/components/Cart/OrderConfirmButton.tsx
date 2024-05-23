import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { THEME } from '@/constants/theme';
import { useCouponApplicabilityChecker } from '@/hooks/useCouponApplicabilityChecker';
import useDiscountCalculator from '@/hooks/useDiscountCalculator';
import { couponSavedCheckListState, totalDiscountPriceState } from '@/recoil/coupons/atoms';
import { isAllUnCheckedState, orderResultState } from '@recoil/cartItems/selectors';

const OrderConfirmButton = () => {
  const navigate = useNavigate();
  const isAllUnChecked = useRecoilValue(isAllUnCheckedState);
  const { totalOrderPrice } = useRecoilValue(orderResultState);
  const [couponSavedCheckList, setCouponSavedCheckList] = useRecoilState(couponSavedCheckListState);
  const setTotalDiscountPrice = useSetRecoilState(totalDiscountPriceState);

  const { isCouponApplicable } = useCouponApplicabilityChecker();
  const { calculateDiscountAmount } = useDiscountCalculator();
  const handleClickOrderConfirm = () => {
    if (isAllUnChecked) return;

    setCouponSavedCheckList((prev) =>
      prev.map((coupon) => ({
        ...coupon,
        isChecked: isCouponApplicable(coupon, totalOrderPrice) ? coupon.isChecked : false,
      })),
    );

    const validDiscountTotal = couponSavedCheckList.reduce((acc, coupon) => {
      if (coupon.isChecked) {
        return acc + calculateDiscountAmount(coupon, totalOrderPrice);
      }
      return acc;
    }, 0);

    setTotalDiscountPrice(validDiscountTotal);

    navigate('/confirm');
  };

  return (
    <button
      css={orderConfirmButton(isAllUnChecked)}
      onClick={handleClickOrderConfirm}
      disabled={isAllUnChecked}
    >
      주문 확인
    </button>
  );
};

export default OrderConfirmButton;

const orderConfirmButton = (isDisabled: boolean) => css`
  width: 100%;
  height: 64px;

  background-color: ${isDisabled ? THEME.DISABLED : THEME.BLACK};

  font-size: 16px;
  font-weight: 700;
  color: ${THEME.WHITE};
`;
