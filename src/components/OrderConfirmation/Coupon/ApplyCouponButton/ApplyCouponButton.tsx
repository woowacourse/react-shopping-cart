import * as Styled from "./ApplyCouponButton.style";

interface ApplyCouponButtonProps {
  onClick: () => void;
}

function ApplyCouponButton({ onClick }: ApplyCouponButtonProps) {
  return (
    <Styled.Button
      onClick={onClick}
      type="button"
      aria-label="쿠폰 적용 모달 열기"
    >
      쿠폰 적용
    </Styled.Button>
  );
}

export default ApplyCouponButton;
