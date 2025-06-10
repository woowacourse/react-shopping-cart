import { CouponResponse } from "../../../../../type/coupon";
import { CartProduct } from "../../../../../type/cart";
import { getDeliveryPrice } from "../../../CartSection/PriceSection/utils";
import { getSelectedCartItems } from "../../../CartSection/utils/getSelectedCartItems";
import { getSelectedCoupons } from "./getSelectedCoupons";

export const getTotalDiscount = ({
  coupons,
  selectedCouponIds,
  cartItems,
  selectedCartIds,
  totalPrice,
  isRemoteArea,
}: {
  coupons: CouponResponse[];
  selectedCouponIds: number[];
  cartItems: CartProduct[];
  selectedCartIds: number[];
  totalPrice: number;
  isRemoteArea: boolean;
}) => {
  return getSelectedCoupons(coupons, selectedCouponIds).reduce(
    (total, current) => {
      return (total += calculateDiscount(
        getSelectedCartItems(cartItems, selectedCartIds),
        current,
        totalPrice,
        isRemoteArea
      ));
    },
    0
  );
};

export const calculateDiscount = (
  selectedCartItems: CartProduct[],
  coupon: CouponResponse,
  totalPrice: number,
  isRemoteArea: boolean
) => {
  switch (coupon.discountType) {
    case "fixed":
      return coupon.discount;

    case "buyXgetY": {
      return calculateBuyXGetY(selectedCartItems, coupon.buyQuantity);
    }

    case "freeShipping": {
      return getDeliveryPrice({
        orderPrice: totalPrice,
        isRemoteArea,
      });
    }

    case "percentage":
      return (totalPrice * coupon.discount) / 100;

    default:
      return 0;
  }
};

const calculateBuyXGetY = (
  selectedCartItems: CartProduct[],
  buyQuantity: number
) => {
  const eligibleItems = selectedCartItems.filter(
    (item: CartProduct) => item.quantity > buyQuantity
  );

  eligibleItems.sort(
    (a: CartProduct, b: CartProduct) => b.product.price - a.product.price
  );

  return eligibleItems[0].product.price;
};
