import { useRecoilValue } from "recoil";
import { Wrapper } from "./style";
import { cartSummaryState } from "../../recoil/selectors/selectors";
import { SmallText, LargeText } from "../common";
import { useLocation } from "react-router-dom";

const CartDescription = () => {
  const location = useLocation();
  const { cartItemKind, cartItemSelectedQuantity, cartItemSelectedKind } =
    useRecoilValue(cartSummaryState);

  return (
    <Wrapper>
      <LargeText>
        {location.pathname === "/" ? "장바구니" : "주문 확인"}
      </LargeText>
      <SmallText>
        {location.pathname === "/" ? (
          `현재 ${cartItemKind}종류의 상품이 담겨있습니다. `
        ) : (
          <>
            <div>
              총 {cartItemSelectedKind}종류의 상품 {cartItemSelectedQuantity}
              개를 주문합니다
            </div>
            <div>최종 결제 금액을 확인해 주세요</div>
          </>
        )}
      </SmallText>
    </Wrapper>
  );
};

export default CartDescription;
