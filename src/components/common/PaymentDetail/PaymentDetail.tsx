/** @jsxImportSource @emotion/react */

import { PaymentDetailContainerStyle, PaymentDetailAmountStyle, PaymentDetailTitleStyle } from "./PaymentDetail.style";

interface PaymentDetailProps {
  title: string;
  amount: number | string;
  directionStyle?: "row" | "column";
}

const PaymentDetail = ({ title, amount, directionStyle = "row" }: PaymentDetailProps) => {
  return (
    <div css={PaymentDetailContainerStyle(directionStyle)}>
      <div css={PaymentDetailTitleStyle}>{title}</div>
      <div css={PaymentDetailAmountStyle}>{typeof amount === "string" ? amount : amount.toLocaleString() + "원"}</div>
    </div>
  );
};

export default PaymentDetail;
