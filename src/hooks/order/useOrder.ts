import { CartItem } from "../../types/cartItem";
import useDeliveryInformation from "./useDeliveryInformation";

interface useOrderParams {
  cartItems: CartItem[];
  orderPrice: number;
  deliveryPrice: number;
}

// 받아야하는 것
// 상품 cartItems
// orderPrice
// deliveryPrice (real deliveryPrice)
// 내보내야하는 것
// (real deliveryPrice)
// real TotalPrice (orderPrice + realDeliveryPrice + discountPrice)
const useOrder = ({ cartItems, orderPrice, deliveryPrice }: useOrderParams) => {
  const { isRemoteArea, toggleRemoteArea } = useDeliveryInformation();

  const discountPrice = -6000;
  const finalDeliveryPrice = isRemoteArea ? deliveryPrice + 3000 : deliveryPrice;
  const finalTotalPrice = orderPrice + discountPrice + finalDeliveryPrice;

  return { finalDeliveryPrice, discountPrice, finalTotalPrice, isRemoteArea, toggleRemoteArea };
};

export default useOrder;
