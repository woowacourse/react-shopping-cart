/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";
import { PaymentFooterStyle } from "./PaymentFooter.style";
import { useSetRecoilState } from "recoil";
import { cartState, remoteAreaState } from "../../../store/atom/atoms";
import { fetchProducts } from "../../../store/api";

const PaymentFooter = () => {
  const navigate = useNavigate();

  const setCartState = useSetRecoilState(cartState);
  const setRemoteAreaState = useSetRecoilState(remoteAreaState);

  const handleClickReturnCart = async () => {
    const { content }: { content: CartItemInfo[] } = await fetchProducts();
    setCartState(content);
    setRemoteAreaState(false);

    navigate("/");
  };

  return (
    <button disabled={false} css={PaymentFooterStyle} onClick={handleClickReturnCart}>
      장바구니로 돌아가기
    </button>
  );
};

export default PaymentFooter;
