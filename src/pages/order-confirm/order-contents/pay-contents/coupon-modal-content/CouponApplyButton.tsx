import { useCallback } from "react";
import { getShoppingCartData } from "../../../../../api/cart";
import { Coupon } from "../../../../../api/coupon";
import Button from "../../../../../components/common/Button";
import { useAPIDataContext } from "../../../../../context/APIDataProvider";
import { useOrderListContext } from "../../../../../context/OrderListProvider";
import { useToastContext } from "../../../../../context/ToastProvider";
import { useOrderCalculation } from "../../../../../hooks/order/useOrderCalculation";
import { useCouponContext } from "../../../context/CouponProvider";
import { calculateCouponDiscount } from "./utils/couponCalculator";

function CouponApplyButton({
  onClose,
}: {
  onClose: () => void;
  couponsResource: Promise<Coupon[]>;
}) {
  const { data: cartListData } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: "cart",
  });
  const { selectedCartItems, isIsland, handleDiscountSetting } =
    useOrderListContext(cartListData);
  const { totalCartPrice, shippingFee } = useOrderCalculation(
    selectedCartItems,
    isIsland
  );

  const { showToast } = useToastContext();
  const { selectedCoupons } = useCouponContext();

  const { finalDiscount } = calculateCouponDiscount(
    selectedCoupons,
    totalCartPrice,
    shippingFee,
    selectedCartItems
  );

  const handleCouponApply = useCallback(() => {
    handleDiscountSetting(finalDiscount);
    showToast("쿠폰이 적용되었습니다.", "info");
    onClose();
  }, [onClose, handleDiscountSetting, finalDiscount, showToast]);

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
