import { CartItem, Coupon, SelectedCartItemQuantity } from "@/types/cart";

const calculatePercentageDiscount = (
  totalOrderPrice: number,
  coupon: Coupon
) => {
  return Math.floor((totalOrderPrice * (coupon.discount ?? 0)) / 100);
};

const calculateBuyXgetY = (
  cartItemsState: CartItem[],
  selectedCartItemsQuantity: SelectedCartItemQuantity[],
  buyX?: number,
  getY?: number
) => {
  if (!buyX || !getY) return 0;

  const discountAvailableItems = selectedCartItemsQuantity.filter(
    ({ quantity }) => quantity > buyX
  );

  const maxPrice =
    discountAvailableItems
      .map(({ id }) => {
        const foundItem = cartItemsState.find((item) => item.id === id);
        return foundItem ? foundItem.product.price : 0;
      })
      .sort((a, b) => b - a)[0] * getY;

  return maxPrice;
};

const calculateDiscountAmount = (
  coupon: Coupon,
  totalOrderPrice: number,
  cartItemsState: CartItem[],
  selectedCartItemsQuantity: SelectedCartItemQuantity[],
  shippingFee: number
) => {
  switch (coupon.discountType) {
    case "fixed":
      return coupon.discount ? coupon.discount : 0;
    case "percentage":
      return calculatePercentageDiscount(totalOrderPrice, coupon);
    case "buyXgetY":
      return calculateBuyXgetY(
        cartItemsState,
        selectedCartItemsQuantity,
        coupon.buyQuantity,
        coupon.getQuantity
      );
    case "freeShipping":
      return shippingFee;
    default:
      return 0;
  }
};

export default calculateDiscountAmount;
