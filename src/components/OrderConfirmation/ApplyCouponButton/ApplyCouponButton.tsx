import { CartItem } from "../../../type/CartItem";
import * as Styled from "./ApplyCouponButton.style";

interface ApplyCouponButtonProps {
  // 선택된 장바구니 아이템들의 정보가 필요할 수 있음
  // 예: selectedCartItems: CartItem[];
  selectedCartItems?: CartItem[];
  handleApplyCoupon?: (couponCodes: string[]) => void;
}

function ApplyCouponButton({
  selectedCartItems,
  handleApplyCoupon,
}: ApplyCouponButtonProps) {
  // modal 열고 닫기
  // 선택된 장바구니 아이템들의 정보 필요

  return (
    <Styled.Button onClick={() => {}} type="button" aria-label="쿠폰 적용">
      쿠폰 적용
    </Styled.Button>
  );
}

export default ApplyCouponButton;
