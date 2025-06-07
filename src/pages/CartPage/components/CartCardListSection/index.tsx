import Text from "../../../../components/common/Text";
import { CartItemsType, HandleCartItemChangeType, HandleCheckChangeType } from "../../../../types/cartItem";
import CartCardList from "../CartCardList";
import PaymentPriceList from "../PaymentPriceList";
import * as S from "./CartCardListSection.styled";

const CartCardListSection = ({
  cartItemsInfo,
  cartItemListProps,
}: {
  cartItemsInfo: Record<
    "cartItemsCount" | "orderPrice" | "deliveryPrice" | "totalPrice" | "cartItemsCheckedCount",
    number
  >;
  cartItemListProps: {
    cartItems: CartItemsType[];
    handleCartItemChange: HandleCartItemChangeType;
    handleCheckChange: HandleCheckChangeType;
    isAllChecked: boolean;
  };
}) => {
  const isHasCartItems = cartItemsInfo.cartItemsCount > 0;

  return isHasCartItems ? (
    <S.Information>
      <Text variant="body-3">현재 {cartItemsInfo.cartItemsCount}종류의 상품이 담겨있습니다.</Text>
      <CartCardList cartItemListProps={cartItemListProps} />
      <PaymentPriceList cartItemsInfo={cartItemsInfo} />
    </S.Information>
  ) : (
    <S.NoInformation>
      <Text variant="body-3">장바구니에 담은 상품이 없습니다.</Text>
    </S.NoInformation>
  );
};

export default CartCardListSection;
