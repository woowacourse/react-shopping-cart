import { Checkbox, Info, Spacing, Text } from "@/components";
import { FREE_DELIVERY_PRICE } from "@/constants";
import { css } from "@emotion/react";
import { useShoppingCartContext } from "../../../MainPage/context";
import { useCartItem, useCartItemQuery } from "@/hooks";
import { CartItemService } from "@/services";
import * as S from "./CartItemSection.styles";
import CartItem from "../CartItem/CartItem";

export default function CartItemSection() {
  const { data: cartItems } = useCartItemQuery();
  const { selectedItemIds, setSelectedItemIds } = useShoppingCartContext();

  const { deleteCartItem, increaseCartItem, decreaseCartItem } = useCartItem();

  const handleSelectItem = (itemId: number) => {
    setSelectedItemIds((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
  };

  const handleSelectAll = () => {
    if (cartItems.content.length === selectedItemIds.length) setSelectedItemIds([]);
    else setSelectedItemIds(cartItems.content.map((item) => item.id));
  };

  const selectedCartItems = cartItems.content.filter((item) => selectedItemIds.includes(item.id));

  const cartItemService = new CartItemService(selectedCartItems);
  const orderPrice = cartItemService.calculateTotalPrice();
  const deliveryFee = cartItemService.calculateDeliveryFee(false);
  const totalPrice = cartItemService.calculateTotalPriceWithDeliveryFee(false);

  const isAllSelected = cartItems.content.length > 0 && selectedItemIds.length === cartItems.content.length;

  const handleDeleteCartItem = (id: number) => {
    setSelectedItemIds((prev) => prev.filter((itemId) => itemId !== id));
    deleteCartItem(id);
  };

  const handleAddButtonClick = (id: number) => {
    increaseCartItem(id);
  };

  const handleMinusButtonClick = (id: number) => {
    decreaseCartItem(id);
  };

  return (
    <S.CartItemSectionWrapper>
      <Text variant="title-1">장바구니</Text>
      {cartItems.content.length === 0 ? (
        <S.EmptyCartWrapper>
          <Text variant="body-1">장바구니에 담은 상품이 없습니다.</Text>
        </S.EmptyCartWrapper>
      ) : (
        <>
          <Spacing size={8} />
          <Text variant="body-2">현재 {cartItems.content.length}종류의 상품이 담겨있습니다.</Text>
          <Spacing size={32} />

          <S.CheckboxWrapper>
            <Checkbox checked={isAllSelected} onClick={handleSelectAll} />

            <Text variant="body-2">전체 선택</Text>
          </S.CheckboxWrapper>

          <Spacing size={16} />

          <S.CartItemList>
            {cartItems.content.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                isSelected={selectedItemIds.includes(item.id)}
                onCheckboxClick={() => handleSelectItem(item.id)}
                onDeleteClick={handleDeleteCartItem}
                onAddButtonClick={() => handleAddButtonClick(item.product.id)}
                onMinusButtonClick={() => handleMinusButtonClick(item.product.id)}
              />
            ))}
          </S.CartItemList>

          <Text
            variant="body-1"
            css={css`
              display: flex;
              align-items: center;
              gap: 4px;
            `}
          >
            <Info /> 총 주문 금액이 {FREE_DELIVERY_PRICE.toLocaleString()}원 이상일 경우 무료 배송됩니다.
          </Text>
          <Spacing size={16} />

          <hr />
          <S.ReceiptTextWrapper>
            <Text variant="title-3">주문 금액</Text>
            <Text variant="title-1">{orderPrice.toLocaleString()}원</Text>
          </S.ReceiptTextWrapper>
          <S.ReceiptTextWrapper>
            <Text variant="title-3">배송비</Text>
            <Text variant="title-1">{deliveryFee.toLocaleString()}원</Text>
          </S.ReceiptTextWrapper>
          <S.ReceiptTextWrapper>
            <Text variant="title-3">총 결제 금액</Text>
            <Text variant="title-1">{totalPrice.toLocaleString()}원</Text>
          </S.ReceiptTextWrapper>
        </>
      )}
    </S.CartItemSectionWrapper>
  );
}
