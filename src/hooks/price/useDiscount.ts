import usePrice from './usePrice';
import useSelectedCouponList from '../coupon/useSelectedCouponList';

import useSelectedCartItemList from '../cartItem/useSelectedCartItemList';

const useDiscount = () => {
  const { orderedPrice } = usePrice();
  const { selectedCouponList } = useSelectedCouponList();
  const { selectedCartItemList } = useSelectedCartItemList();
  const { deliveryFee } = usePrice();

  const percentageDiscountAmount =
    orderedPrice -
    selectedCouponList
      .filter((coupon) => coupon.discountType == 'percentage')
      .reduce((result, { discount }) => {
        return result - (result * (discount ?? 0)) / 100;
      }, orderedPrice);

  const bogoCoupon = selectedCouponList.find(
    (coupon) => coupon.discountType == 'buyXgetY',
  );

  const fixedDiscountAmount = selectedCouponList
    .filter(
      (coupon) =>
        coupon.discountType == 'fixed' &&
        orderedPrice >= (coupon.minimumAmount ?? 0),
    )
    .reduce((result, { discount }) => {
      return result + (discount ?? 0);
    }, 0);

  const maximumPriceInCart = bogoCoupon
    ? selectedCartItemList.reduce((max, { price, quantity }) => {
        return quantity >= (bogoCoupon?.buyQuantity ?? 0)
          ? Math.max(max, price)
          : max;
      }, 0)
    : 0;

  const bogoDiscountAmount =
    maximumPriceInCart * (bogoCoupon?.getQuantity ?? 1);

  const freeShippingDiscountAmount = selectedCouponList.find(
    (coupon) => coupon.discountType === 'freeShipping',
  )
    ? deliveryFee
    : 0;

  const totalDiscountAmount =
    percentageDiscountAmount +
    bogoDiscountAmount +
    fixedDiscountAmount +
    freeShippingDiscountAmount;

  return {
    percentageDiscountAmount,
    bogoDiscountAmount,
    fixedDiscountAmount,
    freeShippingDiscountAmount,
    totalDiscountAmount,
  };
};

export default useDiscount;
