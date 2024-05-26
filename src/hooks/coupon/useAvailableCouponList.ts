import { useRecoilValue } from 'recoil';
import { isCheckedState, mockCoupons, productsState } from './../../store/atoms';
import { totalOrderAmountState } from '../../store/selectors';
import { CartItemType, CouponType } from '../../types';

const validateExpiration = (expirationDate: string) => {
  const today = new Date();
  const couponExpirationDate = new Date(expirationDate);
  return today < couponExpirationDate;
};

const isOverMinOrderAmountCoupon = (orderAmount: number, coupon: CouponType) => {
  if (validateExpiration(coupon.expirationDate) === false) return false;
  if (!coupon.minimumAmount) return false;
  if (orderAmount < coupon.minimumAmount) return false;
  return true;
};

const isOverMinQuantityCoupon = (
  coupon: CouponType,
  checkoutProducts: CartItemType[],
  minQuantity: number,
) => {
  if (validateExpiration(coupon.expirationDate) === false) return false;
  return checkoutProducts.some((product) => product.quantity >= minQuantity);
};

const isWithinAvailableTime = (coupon: CouponType): boolean => {
  if (validateExpiration(coupon.expirationDate) === false) return false;
  if (!coupon.availableTime) return false;
  const { start, end } = coupon.availableTime;

  const now = new Date();
  const nowTime = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

  const [startHours, startMinutes, startSeconds] = start.split(':').map(Number);
  const startTime = startHours * 3600 + startMinutes * 60 + startSeconds;

  const [endHours, endMinutes, endSeconds] = end.split(':').map(Number);
  const endTime = endHours * 3600 + endMinutes * 60 + endSeconds;

  return nowTime >= startTime && nowTime <= endTime;
};

const useAvailableCouponList = () => {
  const { orderAmount } = useRecoilValue(totalOrderAmountState);
  const coupons = mockCoupons;
  const products = useRecoilValue(productsState);
  const isCheckedMap = useRecoilValue(isCheckedState);
  const checkoutProducts = products.filter((product) => isCheckedMap[product.id] === true);

  const availableCoupons = coupons.filter((coupon) => {
    switch (coupon.code) {
      case 'FIXED5000':
        return isOverMinOrderAmountCoupon(orderAmount, coupon);
      case 'BOGO':
        if (coupon.buyQuantity !== undefined && coupon.getQuantity !== undefined) {
          return isOverMinQuantityCoupon(
            coupon,
            checkoutProducts,
            coupon.buyQuantity + coupon.getQuantity,
          );
        }
        return false;
      case 'FREESHIPPING':
        return isOverMinOrderAmountCoupon(orderAmount, coupon);
      case 'MIRACLESALE':
        return isWithinAvailableTime(coupon);
      default:
        return false;
    }
  });

  const unAvailableCoupons = coupons.filter((coupon) => !availableCoupons.includes(coupon));

  return { availableCoupons, unAvailableCoupons };
};

export default useAvailableCouponList;
