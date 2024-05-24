import { PropsWithChildren } from "react";

import Divider from "@/components/Divider/Divider";
import ToolBar from "@/components/ToolBar/ToolBar";
import useCoupon from "@/hooks/useCoupon";

interface CouponProps extends PropsWithChildren {
  couponInfo: Coupon;
}

const Coupon = ({ couponInfo }: CouponProps) => {
  const { isDisabled, isChecked, handleCheckClick } = useCoupon(couponInfo.id);

  return (
    <div>
      <Divider />
      <ToolBar handleCheck={handleCheckClick} isCheck={isChecked} isDisabled={isDisabled}>
        {couponInfo.description}
      </ToolBar>
      Coupon
    </div>
  );
};

export default Coupon;
