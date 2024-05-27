import React from "react";
import { useRecoilValue } from "recoil";
import { couponIdSetSelector } from "../recoil/coupon/couponState";
import InfoIcon from "../assets/InfoIcon.svg?react";
import Splitter from "./default/Splitter";
import CouponItem from "./CouponItem";

const CouponList = () => {
  const couponIds = useRecoilValue(couponIdSetSelector);
  return (
    <div>
      <InfoIcon />
      {[...couponIds].map((id) => (
        <>
          <Splitter />
          <CouponItem couponId={id} />
        </>
      ))}
    </div>
  );
};

export default CouponList;
