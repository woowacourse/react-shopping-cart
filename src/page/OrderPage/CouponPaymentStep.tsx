import {
  OrderConfirmationDetailsHeader,
  OrderConfirmationItemList,
  OrderConfirmationCouponSelection,
  OrderConfirmationShippingIsland,
  OrderConfirmationPriceDetails,
  BOGOOfferNotice,
  OrderConfirmation,
} from "../OrderConfirmation/OrderConfirmation";
import Spinner from "@/components/common/Spinner";
import { CartItem } from "@/type/CartItem";
import { Coupon } from "@/type/Coupon";

import { CouponDiscountResult } from "@/hooks/Coupon/useCouponDiscount";

interface CouponSelectionType {
  selectedCouponIds: Set<string>;
  toggleCoupon: (id: string) => boolean;
  resetToOptimal: (optimalIds: string[]) => void;
}

interface CouponPaymentStepProps {
  selectedCartItems: CartItem[];
  couponsData: Coupon[] | null;
  couponsFetchLoading: boolean;
  couponSelection: CouponSelectionType;
  result: CouponDiscountResult;
  isInIsland: boolean;
  setIsInIsland: (value: boolean) => void;
}

export default function CouponPaymentStep({
  selectedCartItems,
  couponsData,
  couponsFetchLoading,
  couponSelection,
  result,
  isInIsland,
  setIsInIsland,
}: CouponPaymentStepProps) {
  return (
    <OrderConfirmation
      selectedCartItems={selectedCartItems}
      couponsData={couponsData}
      couponSelection={couponSelection}
      result={result}
      isInIsland={isInIsland}
      setIsInIsland={setIsInIsland}
    >
      {couponsFetchLoading ? (
        <Spinner />
      ) : (
        <>
          <OrderConfirmationDetailsHeader />
          <OrderConfirmationItemList />
          <OrderConfirmationCouponSelection />
          <OrderConfirmationShippingIsland />
          <OrderConfirmationPriceDetails />
          <BOGOOfferNotice />
        </>
      )}
    </OrderConfirmation>
  );
}
