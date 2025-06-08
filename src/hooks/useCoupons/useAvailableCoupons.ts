import { useMemo } from "react";
import { CartItem } from "../../type/CartItem";
import { Coupon } from "../../type/Coupons";
import { validateCoupons } from "../../util/coupons/validateCoupons";

const useAvailableCoupons = ({
  cartItems,
  coupons,
}: {
  cartItems: CartItem[];
  coupons: Coupon[];
}) => {
  const availableCoupons = useMemo(
    () =>
      coupons.filter((coupon) =>
        validateCoupons({
          cartItems,
          coupon,
        })
      ),
    [cartItems, coupons]
  );

  const availableCouponsIdList = useMemo(
    () => availableCoupons.map((coupon) => coupon.id),
    [availableCoupons]
  );

  return {
    availableCouponsIdList,
  };
};

export default useAvailableCoupons;
