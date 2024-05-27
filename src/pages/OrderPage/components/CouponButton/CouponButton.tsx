import React from "react";
import { Wrapper } from "./style";

interface CouponButtonProps {
  onClick?: () => void;
}

const CouponButton = ({ onClick }: CouponButtonProps) => {
  return <Wrapper onClick={onClick}>쿠폰 적용</Wrapper>;
};

export default CouponButton;
