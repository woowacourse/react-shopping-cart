import { createContext, useContext } from "react";
import useOrder from "../hooks/useOrder";
import { AvailableCouponType, CouponResponse } from "../../../types/coupon";
import { useLocation } from "react-router";
import { CartItem } from "../../../types/cartItem";

interface OrderContextType {
  cartItems: CartItem[];
  cartItemsTotalQuantity: number;
  cartItemsCheckedCount: number;
  orderPrice: number;
  coupons: CouponResponse[];
  availableCoupons: AvailableCouponType[];
  updateApplyCoupon: (coupons: AvailableCouponType[]) => void;
  finalDeliveryPrice: number;
  discountPrice: number;
  finalTotalPrice: number;
  isRemoteArea: boolean;
  toggleRemoteArea: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const { cartItems, orderPrice, deliveryPrice, cartItemsTotalQuantity, cartItemsCheckedCount } = location.state;

  const {
    coupons,
    availableCoupons,
    updateApplyCoupon,
    finalDeliveryPrice,
    discountPrice,
    finalTotalPrice,
    isRemoteArea,
    toggleRemoteArea,
  } = useOrder({
    cartItems,
    orderPrice,
    deliveryPrice,
  });

  return (
    <OrderContext.Provider
      value={{
        cartItems,
        cartItemsTotalQuantity,
        cartItemsCheckedCount,
        orderPrice,

        // useOrder에서 나온 값
        coupons,
        availableCoupons,
        updateApplyCoupon,
        finalDeliveryPrice,
        discountPrice,
        finalTotalPrice,
        isRemoteArea,
        toggleRemoteArea,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrderContext must be used within an OrderProvider");
  return context;
};
