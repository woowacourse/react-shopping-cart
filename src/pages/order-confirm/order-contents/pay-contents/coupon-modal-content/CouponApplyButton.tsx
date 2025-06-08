import { use, useCallback } from "react";
import { getShoppingCartData } from "../../../../../api/cart";
import { Coupon } from "../../../../../api/coupon";
import Button from "../../../../../components/common/Button";
import { useAPIDataContext } from "../../../../../context/APIDataProvider";
import { useOrderListContext } from "../../../../../context/OrderListProvider";
import { useOrderCalculation } from "../../../../../hooks/order/useOrderCalculation";
import { useCouponContext } from "../../../context/CouponProvider";
import { calculateCouponDiscount } from "./utils/couponCalculator";

function CouponApplyButton({
  onClose,
  couponsResource,
}: {
  onClose: () => void;
  couponsResource: Promise<Coupon[]>;
}) {
  const { data: cartListData } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: "cart",
  });
  const { selectionMap, isIsland } = useOrderListContext(cartListData);
  const { totalCartPrice, shippingFee } = useOrderCalculation(
    cartListData,
    selectionMap,
    isIsland
  );

  const coupons = use(couponsResource);

  const { selectedCoupon } = useCouponContext();
  const { finalDiscount } = calculateCouponDiscount(
    coupons,
    selectedCoupon,
    totalCartPrice,
    shippingFee,
    cartListData
  );

  const handleCouponApply = useCallback(() => {
    onClose();
  }, [onClose]);
  return (
    <Button
      backgroundColor="#333333"
      color="white"
      onClick={() => handleCouponApply()}
      disabled={false}
    >
      총 {finalDiscount.toLocaleString()}원 쿠폰 적용하기
    </Button>
  );
}

export default CouponApplyButton;
