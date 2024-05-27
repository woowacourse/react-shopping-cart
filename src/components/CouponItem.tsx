import React from "react";
import { css } from "@emotion/css";
import { couponSelectorFamily, isSelectedCouponAtomFamily } from "../recoil/coupon/couponState";
import CheckIcon from "../assets/CheckIcon.svg?react";
import { useRecoilState, useRecoilValue } from "recoil";
import Button from "./default/Button";

const CouponItem = ({ couponId }: { couponId: number }) => {
  const coupon = useRecoilValue(couponSelectorFamily(couponId));
  const [isChecked, setIsChecked] = useRecoilState(isSelectedCouponAtomFamily(couponId));

  const expDate = new Date(coupon.expirationDate);
  const handleButtonClick = () => setIsChecked(!isChecked);

  return (
    <div className={flexCSS}>
      <h3 className={couponHeaderCSS}>
        <Button variant={isChecked ? "primary" : "secondary"} onClick={handleButtonClick}>
          <CheckIcon fill={isChecked ? "#ffffff" : "#0000001A"} />
        </Button>
        {coupon.description}
      </h3>
      <div className={couponConditionCSS}>
        <p>{`만료일: ${expDate.getFullYear()}년 ${expDate.getMonth() + 1}월 ${expDate.getDay()}일`}</p>
        {"minimumAmount" in coupon && <p>{`최소 주문 금액: ${coupon.minimumAmount}`}</p>}
        {"availableTime" in coupon && (
          <p>{`사용 가능 시간: ${coupon.availableTime.start}부터 ${coupon.availableTime.end}까지`}</p>
        )}
      </div>
    </div>
  );
};

export default CouponItem;

const flexCSS = css`
  display: flex;
  flex-direction: column;
  row-gap: 12px;

  padding-top: 12px;
  padding-bottom: 24px;
`;

const couponHeaderCSS = css`
  display: flex;
  column-gap: 8px;

  font-family: Noto Sans KR;
  font-size: 16px;
  font-weight: 700;
  line-height: 23.17px;
  text-align: left;
`;

const couponConditionCSS = css`
  display: flex;
  flex-direction: column;
  row-gap: 4px;

  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
`;
