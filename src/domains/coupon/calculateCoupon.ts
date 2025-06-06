export const calculateFixedDiscountCoupon = (
  originTotalPrice: number,
  discount: number
) => {
  return originTotalPrice - discount;
};

export const calculateBogoCoupon = (
  originTotalPrice: number,
  productPrice: number,
  buyQuantity: number
) => {
  const totalDiscount = productPrice * buyQuantity;
  const totalPriceAfterDiscount = originTotalPrice - totalDiscount;
  return {
    totalDiscount,
    totalPriceAfterDiscount,
  };
};

export const calculateFreeShippingCoupon = (
  originTotalPrice: number,
  freeShippingPrice: number
) => {
  const totalDiscount = freeShippingPrice;
  const totalPriceAfterDiscount = originTotalPrice - totalDiscount;
  return {
    totalDiscount,
    totalPriceAfterDiscount,
  };
};

export const calculatePercentageCoupon = (
  originTotalPrice: number,
  percentage: number
) => {
  const totalDiscount = originTotalPrice * (percentage / 100);
  const totalPriceAfterDiscount = originTotalPrice - totalDiscount;
  return {
    totalDiscount,
    totalPriceAfterDiscount,
  };
};

export const mappingCouponCalculator = {
  fixed: calculateFixedDiscountCoupon,
  buyXgetY: calculateBogoCoupon,
  freeShipping: calculateFreeShippingCoupon,
  percentage: calculatePercentageCoupon,
};
