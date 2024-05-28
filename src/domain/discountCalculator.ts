interface Props {
  coupon: Coupon;
  totalPrice: number;
  orderList: Cart[];
  deliveryFee: number;
}

export const discountCalculator = ({
  coupon,
  totalPrice,
  orderList,
  deliveryFee,
}: Props) => {
  const calculateFixedDiscount = () => {
    return totalPrice >= coupon.minimumAmount! ? coupon.discount : 0;
  };

  const calculatePercentageDiscount = () => {
    return Math.floor((coupon.discount! / 100) * totalPrice);
  };

  const calculateBuyXgetYDiscount = () => {
    const applyCouponItems = orderList.filter(
      (order) => order.quantity >= coupon.buyQuantity! + 1,
    );
    if (applyCouponItems.length > 0) {
      const maxPriceItem = applyCouponItems.reduce(
        (maxItem, order) =>
          order.product.price > maxItem.product.price ? order : maxItem,
        applyCouponItems[0],
      );
      return maxPriceItem.product.price;
    }
    return 0;
  };

  const calculateFreeShippingDiscount = () => {
    return totalPrice >= coupon.minimumAmount! ? deliveryFee : 0;
  };

  const calculateDiscountAmount = () => {
    switch (coupon.discountType) {
      case 'fixed':
        return calculateFixedDiscount();
      case 'percentage':
        return calculatePercentageDiscount();
      case 'buyXgetY':
        return calculateBuyXgetYDiscount();
      case 'freeShipping':
        return calculateFreeShippingDiscount();
      default:
        return 0;
    }
  };

  return {
    calculateDiscountAmount,
  };
};

export default discountCalculator;
