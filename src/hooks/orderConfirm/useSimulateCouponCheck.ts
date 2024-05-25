import { Coupon } from '@appTypes/orderConfirm';
import { calculateDiscountAmount } from '@domain/discount';
import { useConfirmCouponApplication } from '@hooks/orderConfirm';
import { useOrderCosts } from '@hooks/shoppingCart';
import { selectedItemsSelector } from '@recoil/shoppingCart';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

const useSimulateCouponCheck = (selectedCouponList: Coupon[]) => {
  const { shippingPrice, orderPrice } = useOrderCosts();

  const selectedCartItems = useRecoilValue(selectedItemsSelector);

  const isApplicabilityCoupon = useConfirmCouponApplication();

  const [temporarySelectedCouponList, setTemporarySelectedCouponList] = useState<Coupon[]>(selectedCouponList);

  const temporaryTotalDiscountAmount = temporarySelectedCouponList.reduce(
    (acc, coupon) => calculateDiscountAmount({ coupon, shippingPrice, orderPrice, selectedCartItems }) + acc,
    0,
  );

  const onAddTemporarySelectedCoupon = (checked: boolean, coupon: Coupon) => {
    setTemporarySelectedCouponList((prevItemList) => {
      const isAlreadySelected = prevItemList.some((item) => item.id === coupon.id);

      if (!checked && isAlreadySelected) {
        return prevItemList.filter((item) => item.id !== coupon.id);
      }

      if (checked && !isAlreadySelected && prevItemList.length < 2) {
        return [...prevItemList, coupon];
      }

      return prevItemList;
    });
  };

  const isCheckedCoupon = (coupon: Coupon) =>
    temporarySelectedCouponList.some((selectedCoupon) => selectedCoupon?.id === coupon.id);

  const selectedCount = temporarySelectedCouponList.length;

  const isActiveCoupon = (coupon: Coupon) =>
    (selectedCount < 2 || temporarySelectedCouponList.some((tempCoupon) => tempCoupon.id === coupon.id)) &&
    isApplicabilityCoupon(coupon);

  return {
    temporarySelectedCouponList,
    temporaryTotalDiscountAmount,
    isActiveCoupon,
    isCheckedCoupon,
    onAddTemporarySelectedCoupon,
  };
};

export default useSimulateCouponCheck;
