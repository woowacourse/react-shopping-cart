/** @jsxImportSource @emotion/react */
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { CartFooterStyle } from "./CartFooter.style";
import { orderAmountSelector } from "../../../store/selector/selectors";

const CartFooter = () => {
  const orderAmount = useRecoilValue(orderAmountSelector);
  const navigate = useNavigate();

  const isDisabled = orderAmount === 0;

  return (
    <button disabled={isDisabled} css={CartFooterStyle} onClick={() => navigate("/order")}>
      주문 확인
    </button>
  );
};

export default CartFooter;
