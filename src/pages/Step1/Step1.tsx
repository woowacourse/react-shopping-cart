import { Button, CartItem, Checkbox, Header, Info, Spacing, Text, useFunnelContext } from "@/components";
import { useCartItem } from "@/hooks";
import { CartItemService } from "@/services";
import { css } from "@emotion/react";
import { useShoppingCartContext } from "../MainPage/context";
import * as S from "./Step1.styles";

export default function Step1() {
  const { cartItems } = useCartItem();
  const { selectedItemIds, setSelectedItemIds } = useShoppingCartContext();

  const { goNextStep } = useFunnelContext();

  // 개별 아이템 선택/해제
  const handleSelectItem = (itemId: number) => {
    setSelectedItemIds((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
  };

  // 전체 선택/해제
  const handleSelectAll = () => {
    if (cartItems?.content.length === selectedItemIds.length) setSelectedItemIds([]);
    else setSelectedItemIds(cartItems?.content.map((item) => item.id) ?? []);
  };

  const selectedCartItems = cartItems?.content.filter((item) => selectedItemIds.includes(item.id));

  const cartItemService = new CartItemService(selectedCartItems ?? []);
  const orderPrice = cartItemService.calculateTotalPrice();
  const deliveryFee = cartItemService.calculateDeliveryFee(false);
  const totalPrice = cartItemService.calculateTotalPriceWithDeliveryFee(false);

  const isAllSelected = cartItems?.content.length > 0 && selectedItemIds.length === cartItems.content.length;

  if (!cartItems) return null;
  return (
    <main>
      <Header>
        <Text variant="title-1" color="white">
          SHOP
        </Text>
      </Header>

      <S.ShoppingCartSection>
        <Text variant="title-1">장바구니</Text>

        {cartItems?.content.length === 0 ? (
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
              {cartItems?.content.map((item) => (
                <CartItem
                  key={item.id}
                  cartItem={item}
                  isSelected={selectedItemIds.includes(item.id)}
                  handleCheckboxClick={() => handleSelectItem(item.id)}
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
              <Info /> 총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
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
        <Spacing size={12} />
      </S.ShoppingCartSection>

      <S.ButtonWrapper>
        <Button
          css={css`
            width: 100%;
          `}
          onClick={goNextStep}
          disabled={cartItems.content.length === 0}
        >
          <Text variant="title-3" color="white">
            주문 확인
          </Text>
        </Button>
      </S.ButtonWrapper>
    </main>
  );
}
