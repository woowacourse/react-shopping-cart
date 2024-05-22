import BaseSummary from "../baseSummary/BaseSummary";

export const OrderSummary: React.FC = () => {
  const couponDiscountPrice = -6000;

  return (
    <div style={{ width: "100%" }}>
      <BaseSummary showCouponDiscount={true} couponDiscountPrice={couponDiscountPrice} />
    </div>
  );
};
