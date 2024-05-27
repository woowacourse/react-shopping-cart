import React from "react";
import { useRecoilValue } from "recoil";
import { couponIdSetSelector } from "../recoil/coupon/couponState";
import InfoIcon from "../assets/InfoIcon.svg?react";
import Splitter from "./default/Splitter";
import CouponItem from "./CouponItem";
import { css } from "@emotion/css";

const CouponList = () => {
  const couponIds = useRecoilValue(couponIdSetSelector);
  return (
    <div className={couponContainerCSS}>
      <div className={InfoTextCSS}>
        <InfoIcon />
        <span>쿠폰은 최대 2개까지 사용할 수 있습니다.</span>
      </div>
      <div>
        {[...couponIds].map((id) => (
          <React.Fragment key={id}>
            <Splitter />
            <CouponItem couponId={id} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CouponList;

const InfoTextCSS = css`
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
`;

const couponContainerCSS = css`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;
