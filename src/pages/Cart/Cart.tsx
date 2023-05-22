import CartList from "../../components/CartList";
import PurchaseBox from "../../components/PurchaseBox";
import {
  CartTitle,
  CartWrapper,
  EmptyCartButton,
  EmptyCartButtonWrapper,
  EmptyCartDescription,
  EmptyCartTitle,
  EmptyCartWrapper,
  FatBorder,
} from "./Cart.style.ts";
import { CartListTitle } from "../../components/CartList/CartList.style.ts";
import { useRecoilValue } from "recoil";
import { cartCountSelector } from "../../recoil/cartAtoms.ts";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cartCount = useRecoilValue(cartCountSelector);
  const navigate = useNavigate();

  return (
    <div>
      <CartTitle>장바구니</CartTitle>
      <FatBorder />
      {cartCount > 0 ? (
        <>
          <CartListTitle>든든배송 상품 ({cartCount}개)</CartListTitle>
          <CartWrapper>
            <CartList />
            <PurchaseBox />
          </CartWrapper>
        </>
      ) : (
        <EmptyCartWrapper>
          <div>
            <EmptyCartTitle>텅</EmptyCartTitle>
            <EmptyCartDescription>장바구니가 비어있어요.</EmptyCartDescription>
            <EmptyCartButtonWrapper>
              <EmptyCartButton onClick={() => navigate("/")}>
                홈으로 돌아가기
              </EmptyCartButton>
            </EmptyCartButtonWrapper>
          </div>
        </EmptyCartWrapper>
      )}
    </div>
  );
}

export default Cart;
