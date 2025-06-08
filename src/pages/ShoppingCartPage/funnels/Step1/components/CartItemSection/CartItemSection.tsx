import { Checkbox, InfoIcon, SpaceBetweenFlex, Spacing, Text } from "@/components";
import { FREE_DELIVERY_PRICE } from "@/constants";
import { useCartItemQuery } from "@/hooks";
import { CartItemService } from "@/services";
import { css } from "@emotion/react";
import { useShoppingCartContext } from "@/pages/ShoppingCartPage/contexts";
import CartItem from "../CartItem/CartItem";
import * as S from "./CartItemSection.styles";
import { RenderIfItemsExist } from "@/modules";

export default function CartItemSection() {
  const { selectedItemIds, setSelectedItemIds } = useShoppingCartContext();
  const { data: cartItems } = useCartItemQuery();

  const selectedCartItems = cartItems.content.filter((item) => selectedItemIds.includes(item.id));

  const cartItemService = new CartItemService(cartItems.content);
  const selectedCartItemService = new CartItemService(selectedCartItems);

  const typeCount = cartItemService.calculateTypeCount();
  const orderPrice = selectedCartItemService.calculateOrderAmount();
  const deliveryFee = selectedCartItemService.calculateDeliveryFee(false);
  const orderAmount = selectedCartItemService.calculateOrderAmountWithDeliveryFee(false);

  const isAllSelected = cartItems.content.length > 0 && selectedItemIds.length === cartItems.content.length;

  const handleSelectAll = () => {
    if (cartItems.content.length === selectedItemIds.length) setSelectedItemIds([]);
    else setSelectedItemIds(cartItems.content.map((item) => item.id));
  };

  return (
    <S.CartItemSectionWrapper>
      <Text variant="title-1">장바구니</Text>

      <RenderIfItemsExist
        items={cartItems.content}
        fallback={
          <S.EmptyCartWrapper>
            <Text variant="body-1">장바구니에 담은 상품이 없습니다.</Text>
          </S.EmptyCartWrapper>
        }
      >
        <>
          <Spacing size={8} />

          <Text variant="body-2">현재 {typeCount}종류의 상품이 담겨있습니다.</Text>

          <Spacing size={32} />

          <S.CheckboxWrapper onClick={handleSelectAll}>
            <Checkbox checked={isAllSelected} />

            <Text variant="body-2">전체 선택</Text>
          </S.CheckboxWrapper>

          <Spacing size={16} />

          <S.CartItemList>
            {cartItems.content.map((item) => (
              <CartItem key={item.id} id={item.id} />
            ))}
          </S.CartItemList>

          <Text
            as="p"
            variant="body-1"
            css={css`
              display: flex;
              align-items: center;
              gap: 4px;
            `}
          >
            <InfoIcon /> 총 주문 금액이 {FREE_DELIVERY_PRICE.toLocaleString()}원 이상일 경우 무료 배송됩니다.
          </Text>
          <Spacing size={16} />

          <hr />

          <SpaceBetweenFlex>
            <Text variant="title-3">주문 금액</Text>
            <Text variant="title-1">{orderPrice.toLocaleString()}원</Text>
          </SpaceBetweenFlex>
          <SpaceBetweenFlex>
            <Text variant="title-3">배송비</Text>
            <Text variant="title-1">{deliveryFee.toLocaleString()}원</Text>
          </SpaceBetweenFlex>
          <SpaceBetweenFlex>
            <Text variant="title-3">총 결제 금액</Text>
            <Text variant="title-1">{orderAmount.toLocaleString()}원</Text>
          </SpaceBetweenFlex>
        </>
      </RenderIfItemsExist>
    </S.CartItemSectionWrapper>
  );
}
