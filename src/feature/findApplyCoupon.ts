import {CartProduct} from '../type/cart';
import {CouponType} from '../type/coupon';

const BEFORE_PROCESSING_NOW = new Date();
const NOW = {
  year: BEFORE_PROCESSING_NOW.getFullYear(),
  month: BEFORE_PROCESSING_NOW.getMonth() + 1,
  date: BEFORE_PROCESSING_NOW.getDate(),
  hour: BEFORE_PROCESSING_NOW.getHours(),
  minute: BEFORE_PROCESSING_NOW.getMinutes(),
};

export const findCanApplyCoupon = (
  coupons: CouponType[] | undefined,
  price: number,
  selectedItems: CartProduct[],
  deliveryPrice: number,
  now = NOW
) => {
  if (!coupons) return;
  let filteredCoupons = [...coupons];

  filteredCoupons = coupons.filter((coupon) => {
    if (coupon.code === 'FREESHIPPING')
      return deliveryPrice > 0 && coupon.minimumAmount
        ? filterByPrice(price, coupon.minimumAmount)
        : false;
    if (coupon.minimumAmount) return filterByPrice(price, coupon.minimumAmount);
    return true;
  });

  // 2+1 상품이 있는지
  if (!filterByBogo(selectedItems)) {
    filteredCoupons = filteredCoupons.filter(
      (coupon) => coupon.code !== 'BOGO'
    );
  }
  // 날짜 이내인지
  filteredCoupons = filteredCoupons.filter((coupon) =>
    filterByDate(coupon, now)
  );
  // 시간 이내인지
  filteredCoupons = filteredCoupons.filter((coupon) =>
    filterByTime(coupon, now)
  );

  return filteredCoupons;
};

function filterByPrice(price: number, minimumAmount: number) {
  return price >= minimumAmount;
}

function filterByDate(coupon: CouponType, now: typeof NOW) {
  const splitExpirationDate = coupon.expirationDate.split('-');
  const year = Number(splitExpirationDate[0]);
  const month = Number(splitExpirationDate[1]);
  const date = Number(splitExpirationDate[2]);

  if (year < now.year) return false;
  if (year === now.year) {
    if (month < now.month) return false;
    if (month === now.month) {
      if (date < now.date) return false;
    }
  }
  return true;
}

function filterByTime(coupon: CouponType, now: typeof NOW) {
  if (!coupon?.availableTime) return true;
  const startTime = Number(coupon.availableTime.start.split(':')[0]) * 60;
  const endTime = Number(coupon.availableTime.end.split(':')[0]) * 60;
  const nowTime = now.hour * 60 + now.minute;

  if (nowTime >= startTime && nowTime <= endTime) return true;
  return false;
}

// 2+1 쿠폰이 적용되는지 여부(3개 이상 구매한 상품이 있는지)
function filterByBogo(selectedItems: CartProduct[]) {
  return selectedItems.find((item) => item.quantity >= 3);
}
