import Button from "../../Common/Button/Button";
import { Button as couponButtonStyle } from "./CouponButton.styles";

interface CouponButtonProps {
  onClick: () => void;
}

export default function CouponButton({ onClick }: CouponButtonProps) {
  return (
    <Button cssStyle={couponButtonStyle} onClick={onClick}>
      쿠폰 적용
    </Button>
  );
}
