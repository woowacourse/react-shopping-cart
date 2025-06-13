import { CouponResponse } from "../../../../../type/coupon";
import { CartProduct } from "../../../../../type/cart";
import { getDeliveryPrice } from "../../../CartSection/PriceSection/utils";
import { getPrice } from "../../../CartSection/PriceSection/utils";

export const getTotalDiscount = ({
  appliedCoupons,
  orderItems,
  isRemoteArea,
}: {
  appliedCoupons: CouponResponse[];
  orderItems: CartProduct[];
  isRemoteArea: boolean;
}) => {
  return appliedCoupons.reduce((total, current) => {
    return (total += calculateDiscount(orderItems, current, isRemoteArea));
  }, 0);
};

export const calculateDiscount = (
  selectedCartItems: CartProduct[],
  coupon: CouponResponse,
  isRemoteArea: boolean
) => {
  const { orderPrice } = getPrice({
    items: selectedCartItems,
    isRemoteArea,
    discount: 0,
  });
  switch (coupon.discountType) {
    case "fixed":
      return coupon.discount;

    case "buyXgetY": {
      return calculateBuyXGetY(selectedCartItems, coupon.buyQuantity);
    }

    case "freeShipping": {
      return getDeliveryPrice({
        orderPrice,
        isRemoteArea,
      });
    }

    case "percentage":
      return (orderPrice * coupon.discount) / 100;

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
