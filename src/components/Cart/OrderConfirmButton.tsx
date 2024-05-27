import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { couponApplicabilityChecker } from '@/components/Coupon/utils/couponApplicabilityChecker';
import { THEME } from '@/constants/theme';
import { couponChecklistState } from '@/recoil/coupons/atoms';
import { fetchCouponSelector } from '@/recoil/coupons/fetchCouponSelector';
import { isAllUnCheckedState, orderResultState } from '@recoil/cartItems/selectors';

const OrderConfirmButton = () => {
  const navigate = useNavigate();

  const isAllUnChecked = useRecoilValue(isAllUnCheckedState);
  const { totalOrderPrice } = useRecoilValue(orderResultState);
  const couponList = useRecoilValue(fetchCouponSelector);
  const setCouponCheckList = useSetRecoilState(couponChecklistState);

  const { isCouponApplicable } = couponApplicabilityChecker(couponList);

  const handleClickOrderConfirm = () => {
    if (isAllUnChecked) return;

    setCouponCheckList((prev) =>
      prev.map((coupon) => ({
        ...coupon,
        isChecked: isCouponApplicable({ coupon, totalOrderPrice }) ? coupon.isChecked : false,
      })),
    );

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
