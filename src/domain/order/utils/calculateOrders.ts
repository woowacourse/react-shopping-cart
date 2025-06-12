import { Cart } from "../../../api/cart";
import { Coupon } from "../../../api/coupon";
import { calculateCouponDiscount } from "../../coupon/utils/couponCalculator";
import {
  FREE_SHIPPING_STANDARD,
  ISLAND_SHIPPING_FEE,
  SHIPPING_FEE,
} from "../hooks/OrderConstants";

type OrderBase = {
  typeCount: number;
  totalCount: number;
  totalCartPrice: number;
};

const getOrderBase = (items: Cart[]): OrderBase => ({
  typeCount: items.length,
  totalCount: items.reduce((acc, cart) => acc + cart.quantity, 0),
  totalCartPrice: items.reduce(
    (acc, cart) => acc + cart.product.price * cart.quantity,
    0
  ),
});

const withShipping = (base: OrderBase, isIsland: boolean) => {
  const baseFee =
    base.totalCartPrice >= FREE_SHIPPING_STANDARD || base.totalCartPrice === 0
      ? 0
      : SHIPPING_FEE;
  const shippingFee = baseFee + (isIsland ? ISLAND_SHIPPING_FEE : 0);
  return { ...base, shippingFee };
};

const withCoupons = (
  base: OrderBase & { shippingFee: number },
  coupons: Coupon[],
  items: Cart[]
) => {
  const { finalShippingFee, finalDiscount } = calculateCouponDiscount(
    coupons,
    base.totalCartPrice,
    base.shippingFee,
    items
  );
  return { ...base, finalShippingFee, finalDiscount };
};

const calculateTotal = (state: {
  totalCartPrice: number;
  finalShippingFee: number;
  finalDiscount: number;
}) => ({
  totalPrice:
    state.totalCartPrice + state.finalShippingFee - state.finalDiscount,
});

export const calculateOrders = (selectedCartItems: Cart[]) => {
  const base = getOrderBase(selectedCartItems);

  return {
    getBasicOrderPrice: (isIsland = false) => ({
      ...base,
      ...withShipping(base, isIsland),
      ...calculateTotal({
        totalCartPrice: base.totalCartPrice,
        finalShippingFee: withShipping(base, isIsland).shippingFee,
        finalDiscount: 0,
      }),
    }),

    getOrderPriceWithCoupon: (coupons: Coupon[] = [], isIsland = false) => {
      const withShippingFee = withShipping(base, isIsland);
      const withCoupon = withCoupons(
        withShippingFee,
        coupons,
        selectedCartItems
      );
      return {
        ...base,
        ...withCoupon,
        ...calculateTotal(withCoupon),
      };
    },
  };
};
