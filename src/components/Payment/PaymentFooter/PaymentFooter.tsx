/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";
import { PaymentFooterStyle } from "./PaymentFooter.style";

const PaymentFooter = () => {
  const navigate = useNavigate();

  return (
    <button
      disabled={false}
      css={PaymentFooterStyle}
      onClick={() => {
        navigate("/");
      }}
    >
      장바구니로 돌아가기
    </button>
  );
};

export default PaymentFooter;
