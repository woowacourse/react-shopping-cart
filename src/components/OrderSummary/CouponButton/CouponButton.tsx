import { Button } from "./CouponButton.styles";

interface CouponButtonProps {
  onClick: () => void;
}

export default function CouponButton({ onClick }: CouponButtonProps) {
  return (
    <button css={Button} onClick={onClick}>
      쿠폰 적용
    </button>
  );
}
