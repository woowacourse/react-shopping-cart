import Button from "../../../../components/common/Button";
import DeliveryOptions from "./components/DeliveryOptions";
import PaymentPriceList from "./components/PaymentPriceList";
import CouponModal from "./components/CouponModal";
import PaymentButton from "./components/PaymentButton";
import { useState } from "react";
import { useOrderState } from "./hooks/useOrderState";
import { OrderItem } from "../../types";

const PriceContainer = ({ orderItems }: { orderItems: OrderItem[] }) => {
  const { isIsolatedAreaSelected, toggleIsolatedArea, calculation, availableCoupons, selectedCouponIds, toggleCoupon } =
    useOrderState({ orderItems });
  const [isOpen, setIsOpen] = useState(false);
  const orderState = {
    isIsolatedAreaSelected,
    selectedCouponIds,
    orderItems,
    availableCoupons,
    calculation,
    toggleCoupon,
  };
  return (
    <>
      <Button variant="secondary" size="full" onClick={() => setIsOpen((prev) => !prev)}>
        쿠폰 적용
      </Button>
      <DeliveryOptions isIsolatedAreaSelected={isIsolatedAreaSelected} onToggleIsolatedArea={toggleIsolatedArea} />
      <PaymentPriceList calculation={calculation} />
      <PaymentButton orderItems={orderItems} />
      {isOpen && <CouponModal onClose={() => setIsOpen(false)} orderState={orderState} />}
    </>
  );
};

export default PriceContainer;
