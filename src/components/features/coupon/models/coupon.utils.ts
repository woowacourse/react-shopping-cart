import { CouponType } from './coupon.types';

export const createCoupon = (config: CouponType): CouponType => {
  const base = {
    id: config.id,
    code: config.code,
    description: config.description,
    expirationDate: new Date(config.expirationDate),
  };

  switch (config.discountType) {
    case 'fixed':
      return {
        ...base,
        discountType: 'fixed',
        discount: config.discount,
        minimumAmount: config.minimumAmount,
      };
    case 'buyXgetY':
      return {
        ...base,
        discountType: 'buyXgetY',
        buyQuantity: config.buyQuantity,
        getQuantity: config.getQuantity,
      };
    case 'freeShipping':
      return {
        ...base,
        discountType: 'freeShipping',
        minimumAmount: config.minimumAmount,
      };
    case 'percentage':
      return {
        ...base,
        discountType: 'percentage',
        discount: config.discount,
        availableTime: config.availableTime,
      };
    default:
      throw new Error('쿠폰 code가 존재하지 않습니다.');
  }
};
