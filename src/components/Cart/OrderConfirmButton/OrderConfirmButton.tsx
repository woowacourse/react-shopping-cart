import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { orderConfirmButton } from './OrderConfirmButton.styled';

import { couponChecklistState } from '@/recoil/coupons/atoms';
import { fetchCouponSelector } from '@/recoil/coupons/fetchCouponSelector';
import { couponApplicabilityChecker } from '@/utils/coupons/couponApplicabilityChecker';
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
