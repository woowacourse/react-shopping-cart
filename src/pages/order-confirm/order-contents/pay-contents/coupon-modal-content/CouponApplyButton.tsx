import { useCallback } from "react";
import Button from "../../../../../components/common/Button";

function CouponApplyButton({ onClose }: { onClose: () => void }) {
  // 쿠폰 현재 상태에 따라 금액 계산 로직
  // 페이지에 적용하도록 orderListProvider 저장 로직 호출
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
      총 6,000원 쿠폰 적용하기
    </Button>
  );
}

export default CouponApplyButton;
