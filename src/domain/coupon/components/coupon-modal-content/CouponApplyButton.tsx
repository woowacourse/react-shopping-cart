import { useCallback } from "react";
import { getShoppingCartData } from "../../../../api/cart";
import { Coupon } from "../../../../api/coupon";
import Button from "../../../../components/common/inputs/Button";
import { useAPIDataContext } from "../../../../context/APIDataProvider";
import { useOrderListContext } from "../../../../context/OrderListProvider";
import { useToastContext } from "../../../../context/ToastProvider";
import { useOrderCalculation } from "../../../order/hooks/useOrderCalculation";
import { useCouponContext } from "../../../../pages/order-confirm/context/CouponProvider";

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
  const { selectedCoupons } = useCouponContext();
  const { finalDiscount } = useOrderCalculation(
    selectedCartItems,
    isIsland,
    selectedCoupons
  );

  const { showToast } = useToastContext();

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
