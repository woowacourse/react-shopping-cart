/** @jsxImportSource @emotion/react */

import { PaymentDetailContainerStyle, PaymentDetailAmountStyle, PaymentDetailTitleStyle } from "./PaymentDetail.style";

const PaymentDetail = ({ title, amount }: { title: string; amount: number }) => {
  return (
    <div css={PaymentDetailContainerStyle}>
      <div css={PaymentDetailTitleStyle}>{title}</div>
      <div css={PaymentDetailAmountStyle}>{amount.toLocaleString() + "원"}</div>
    </div>
  );
};

export default PaymentDetail;
