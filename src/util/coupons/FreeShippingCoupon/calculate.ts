import {
  REMOTE_AREA_SHIPPING_FEE,
  SHIPPING_FEE,
} from "../../../constants/priceSetting";

const getDiscount = ({
  hasDefaultShipping,
  hasRemoteAreaShipping,
}: {
  hasDefaultShipping: boolean;
  hasRemoteAreaShipping?: boolean;
}) => {
  if (hasDefaultShipping && hasRemoteAreaShipping) {
    return SHIPPING_FEE + REMOTE_AREA_SHIPPING_FEE;
  } else if (hasDefaultShipping) {
    return SHIPPING_FEE;
  } else if (hasRemoteAreaShipping) {
    return REMOTE_AREA_SHIPPING_FEE;
  } else {
    return 0;
  }
};

export const calculateFreeShippingCoupon = ({
  totalPrice,
  hasDefaultShipping,
  hasRemoteAreaShipping = false,
}: {
  totalPrice: number;
  hasDefaultShipping: boolean;
  hasRemoteAreaShipping?: boolean;
}) => {
  const discount = getDiscount({ hasDefaultShipping, hasRemoteAreaShipping });
  const discountedPrice = totalPrice - discount;

  return discountedPrice < 0 ? 0 : discountedPrice;
};
