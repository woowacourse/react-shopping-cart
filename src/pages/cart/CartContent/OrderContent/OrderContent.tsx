import { useOrderList } from "../../hooks/useOrderList";
import AllCheckBox from "@/shared/components/AllCheckBox/AllCheckBox";
import CartList from "./CartList/CartList";
import PriceContainer from "./PriceContainer/PriceContainer";
import OrderConfirmButton from "./OrderConfirmButton/OrderConfirmButton";
import * as S from "./OrderContent.styled";
import { useCartItemContext } from "../../contexts/CartItemProvider";

export default function OrderContent() {
  const { cartItems } = useCartItemContext();
  const {
    orderList,
    orderTotalPrice,
    isAllSelected,
    toggleAllSelection,
    addSelectedItem,
    removeSelectedItem,
    getIsSelected,
  } = useOrderList(cartItems);

  return (
    <>
      <AllCheckBox
        isAllSelected={isAllSelected}
        toggleAllSelection={toggleAllSelection}
      />
      <S.ScrollContainer>
        <CartList
          getIsSelected={getIsSelected}
          addSelectedItem={addSelectedItem}
          removeSelectedItem={removeSelectedItem}
        />
        <PriceContainer orderTotalPrice={orderTotalPrice} />
      </S.ScrollContainer>
      <OrderConfirmButton
        orderList={orderList}
        orderTotalPrice={orderTotalPrice}
      />
    </>
  );
}
