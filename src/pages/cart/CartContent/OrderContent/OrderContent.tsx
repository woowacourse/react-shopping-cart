import { useOrderList } from "../../hooks/useOrderList";
import AllCheckBox from "@/shared/components/AllCheckBox/AllCheckBox";
import CartList from "./CartList/CartList";
import PriceContainer from "@/domains/components/PriceContainer/PriceContainer";
import OrderConfirmButton from "./OrderConfirmButton/OrderConfirmButton";
import * as S from "./OrderContent.styled";
import { useCartItemContext } from "../../contexts/CartItemProvider";
import CartItemWithContext from "./CartList/CartItemWithContext/CartItemWithContext";
import { getDeliveryPrice } from "@/domains/utils/getDeliveryPrice";

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

  const handleCheckBoxClick = (id: number, isChecked: boolean) => {
    if (isChecked) {
      removeSelectedItem(id);
      return;
    }

    addSelectedItem(id);
  };

  const deliveryPrice = getDeliveryPrice(orderTotalPrice);
  const paymentPrice = orderTotalPrice + deliveryPrice;
  return (
    <>
      <AllCheckBox
        isAllSelected={isAllSelected}
        toggleAllSelection={toggleAllSelection}
      />
      <S.ScrollContainer>
        <CartList>
          {cartItems.map((cartItem) => (
            <CartItemWithContext
              key={cartItem.id}
              cartItem={cartItem}
              isChecked={getIsSelected(cartItem.id)}
              onCheck={handleCheckBoxClick}
              onRemove={removeSelectedItem}
            />
          ))}
        </CartList>
        <PriceContainer
          priceList={[
            {
              title: "총 주문 금액",
              price: orderTotalPrice,
            },
            {
              title: "배송비",
              price: deliveryPrice,
            },
          ]}
          paymentPrice={paymentPrice}
        />
      </S.ScrollContainer>
      <OrderConfirmButton orderList={orderList} paymentPrice={paymentPrice} />
    </>
  );
}
