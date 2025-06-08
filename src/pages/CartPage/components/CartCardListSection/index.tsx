import * as S from "./CartCardListSection.styled";
import Text from "../../../../components/common/Text";
import CartCardList from "../CartCardList";
import PaymentPriceList from "../PaymentPriceList";
import { useCartItems } from "../../contexts/CartItemsContext";
import { useCartSelection } from "../../hooks/useCartSelection";

const CartCardListSection = () => {
  const { cartItems } = useCartItems();
  const selectionState = useCartSelection(cartItems);
  const isHasCartItems = cartItems.length > 0;

  return isHasCartItems ? (
    <S.Information>
      <Text variant="body-3">현재 {cartItems.length}종류의 상품이 담겨있습니다.</Text>
      <CartCardList selectionState={selectionState} />
      <PaymentPriceList selectionState={selectionState} />
    </S.Information>
  ) : (
    <S.NoInformation>
      <Text variant="body-3">장바구니에 담은 상품이 없습니다.</Text>
    </S.NoInformation>
  );
};

export default CartCardListSection;
