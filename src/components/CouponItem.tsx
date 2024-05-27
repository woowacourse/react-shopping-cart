import React from "react";
import { css } from "@emotion/css";
import { couponSelectorFamily, isSelectedCouponAtomFamily } from "../recoil/coupon/couponState";
import CheckIcon from "../assets/CheckIcon.svg?react";
import { isCheckedSelectorFamily } from "../recoil/cart/checkedState";
import { useRecoilState, useRecoilValue } from "recoil";

const CouponItem = ({ couponId }: { couponId: number }) => {
  const coupon = useRecoilValue(couponSelectorFamily(couponId));
  const [isChecked, setIsChecked] = useRecoilState(isSelectedCouponAtomFamily(couponId));

  const expDate = new Date(coupon.expirationDate);
  const handleButtonClick = () => setIsChecked(!isChecked);

  return (
    <div className={flexCSS}>
      <h3>
        <button onClick={handleButtonClick}>
          <CheckIcon fill={isChecked ? "#ffffff" : "#0000001A"} />
        </button>{" "}
        {coupon.description}
      </h3>
      <div className={flexSmallCSS}>
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
`;

const flexSmallCSS = css`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;
