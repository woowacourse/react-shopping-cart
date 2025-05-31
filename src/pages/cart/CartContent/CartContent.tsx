import EmptyCartContainer from "./EmptyCartContainer/EmptyCartContainer";
import PriceContainer from "./PriceContainer/PriceContainer";
import CartList from "./CartList/CartList";
import CheckBox from "@/shared/components/CheckBox/CheckBox";
import * as S from "./CartContent.styled";
import { useOrderList } from "../hooks/useCartItem";
import OrderConfirmButton from "./OrderConfirmButton/OrderConfirmButton";

export default function CartContent() {
  const {
    cartItems,
    isLoading,
    errorMessage,
    refetchCartItems,
    orderList,
    orderTotalPrice,
    isAllSelected,
    toggleAllSelection,
    addSelectedItem,
    removeSelectedItem,
  } = useOrderList();

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (errorMessage) {
    return <div>에러남</div>;
  }

  if (!cartItems?.length) {
    return <EmptyCartContainer />;
  }

  return (
    <S.Container>
      <S.Text>현재 {cartItems.length}종류의 상품이 담겨있습니다.</S.Text>
      <S.AllCheckBox>
        <CheckBox
          isChecked={isAllSelected}
          onClick={toggleAllSelection}
          aria-label="전체 선택"
        />
        <S.Text>전체 선택</S.Text>
      </S.AllCheckBox>
      <S.ScrollContainer>
        <CartList
          cartItems={cartItems}
          orderList={orderList}
          refetchCartItems={refetchCartItems}
          addSelectedItem={addSelectedItem}
          removeSelectedItem={removeSelectedItem}
        />
        <PriceContainer orderTotalPrice={orderTotalPrice} />
      </S.ScrollContainer>
      <OrderConfirmButton
        orderList={orderList}
        orderTotalPrice={orderTotalPrice}
      />
    </S.Container>
  );
}
