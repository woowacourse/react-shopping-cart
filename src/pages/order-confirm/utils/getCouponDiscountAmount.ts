import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { Coupon } from "@/apis/coupon/coupon.type";
import { getMostExpensiveProductPrice } from "@/domains/utils/getMostExpensiveProductPrice";

type GetCouponDiscountAmountParams = {
  coupon: Coupon;
  orderList: CartItemType[];
  deliveryPrice: number;
};

export const getCouponDiscountAmount = ({
  coupon,
  orderList,
  deliveryPrice,
}: GetCouponDiscountAmountParams): number => {
  switch (coupon.discountType) {
    case "fixed": {
      return coupon.discount;
    }
    case "buyXgetY": {
      const { buyQuantity, getQuantity } = coupon;
      const eligibleItems = orderList.filter(
        ({ quantity }) => quantity >= buyQuantity + getQuantity
      );
      const mostExpensiveProductPrice =
        getMostExpensiveProductPrice(eligibleItems);
      return mostExpensiveProductPrice;
    }
    case "freeShipping": {
      return deliveryPrice;
    }
    case "percentage": {
      const mostExpensiveProductPrice = getMostExpensiveProductPrice(orderList);
      return Math.floor(mostExpensiveProductPrice * (coupon.discount / 100));
    }
    default:
      return 0;
  }
};
