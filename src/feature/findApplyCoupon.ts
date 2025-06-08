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
const FIXED5000_MINIMUM_AMOUNT = 100_000;
const FREE_SHIPPING_MINIMUM_AMOUNT = 50_000;

export const findCanApplyCoupon = (
  coupons: CouponType[] | undefined,
  price: number,
  selectedItems: CartProduct[],
  deliveryPrice: number
) => {
  if (!coupons) return;
  let filteredCoupons = [...coupons];
  // 10만원 이상인지
  if (price < FIXED5000_MINIMUM_AMOUNT)
    filteredCoupons = coupons.filter((coupon) => coupon.code !== 'FIXED5000');
  // 5만원 이상인지, 배송비가 무료인지
  if (deliveryPrice === 0 || price < FREE_SHIPPING_MINIMUM_AMOUNT)
    filteredCoupons = filteredCoupons.filter(
      (coupon) => coupon.code !== 'FREESHIPPING'
    );
  // 2+1 상품이 있는지
  if (!filterByBogo(selectedItems)) {
    filteredCoupons = filteredCoupons.filter(
      (coupon) => coupon.code !== 'BOGO'
    );
  }
  // 날짜 이내인지
  filteredCoupons = filteredCoupons.filter((coupon) => filterByDate(coupon));
  // 시간 이내인지
  filteredCoupons = filteredCoupons.filter((coupon) => filterByTime(coupon));

  return filteredCoupons;
};

function filterByDate(coupon: CouponType) {
  const splitExpirationDate = coupon.expirationDate.split('-');
  const year = Number(splitExpirationDate[0]);
  const month = Number(splitExpirationDate[1]);
  const date = Number(splitExpirationDate[2]);

  if (year < NOW.year) return false;
  if (year === NOW.year) {
    if (month < NOW.month) return false;
    if (month === NOW.month) {
      if (date < NOW.date) return false;
    }
  }
  return true;
}

function filterByTime(coupon: CouponType) {
  if (!coupon?.availableTime) return true;
  const startTime = Number(coupon.availableTime.start.split(':')[0]) * 60;
  const endTime = Number(coupon.availableTime.end.split(':')[0]) * 60;
  const nowTime = NOW.hour * 60 + NOW.minute;

  if (nowTime >= startTime && nowTime <= endTime) return true;
  return false;
}

// 2+1 쿠폰이 적용되는지 여부(3개 이상 구매한 상품이 있는지)
function filterByBogo(selectedItems: CartProduct[]) {
  return selectedItems.find((item) => item.quantity >= 3);
}
