import React from "react";
import { css } from "@emotion/css";
import InfoIcon from "../../assets/InfoIcon.svg?react";
import Splitter from "../default/Splitter";
import LabelValue from "./LabelValue";
import { useRecoilValue } from "recoil";
import { orderPriceSelector } from "../../recoil/selector";
import { formatCurrency } from "../../utils/formatCurrency";

const OrderSummary = () => {
  const orderPrice = useRecoilValue(orderPriceSelector);
  return (
    <div className={OrderSummaryCSS}>
      <div className={InfoContainer}>
        <InfoIcon />
        <span className={InfoTextCSS}>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</span>
      </div>
      <Splitter />
      <LabelValue label="주문 금액" value={formatCurrency(orderPrice)} />
      <LabelValue label="배송비" value="0원" />
      <Splitter />
      <LabelValue label="총 결제금액" value="0원" />
    </div>
  );
};

export default OrderSummary;

const OrderSummaryCSS = css`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const InfoContainer = css`
  display: flex;
  gap: 4px;
`;

const InfoTextCSS = css`
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
`;
