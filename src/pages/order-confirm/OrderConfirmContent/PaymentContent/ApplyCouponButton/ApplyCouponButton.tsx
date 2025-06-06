import Button from "@/shared/components/Button/Button";
import { ComponentProps } from "react";

type ApplyCouponButton = ComponentProps<"button">;

export default function ApplyCouponButton({ ...props }: ApplyCouponButton) {
  return (
    <Button type="button" variant="secondary" {...props}>
      쿠폰 적용
    </Button>
  );
}
