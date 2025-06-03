import { CartItemApi } from "@/apis";
import { Button, CartItem, Checkbox, Header, Info, Spacing, Text } from "@/components";
import { PATH, QUERY_KEY } from "@/constants";
import { useQuery } from "@/modules";
import { GetCartItemsResponse } from "@/types";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as S from "./Step1.styles";

export default function Step1() {
  const { data: cartItems, refetch } = useQuery<GetCartItemsResponse>({
    queryKey: QUERY_KEY.CART_ITEM,
    queryFn: CartItemApi.getCartItems,
  });

  const navigate = useNavigate();
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);

  // 개별 아이템 선택/해제
  const handleSelectItem = (itemId: number) => {
    setSelectedItemIds((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
  };

  // 전체 선택/해제
  const handleSelectAll = () => {
    if (cartItems?.content.length === selectedItemIds.length) setSelectedItemIds([]);
    else setSelectedItemIds(cartItems?.content.map((item) => item.id) ?? []);
  };

  const orderPrice =
    cartItems?.content.reduce(
      (total, item) => total + (selectedItemIds.includes(item.id) ? item.product.price * item.quantity : 0),
      0,
    ) || 0;
  const deliveryFee = orderPrice >= 100_000 ? 0 : 3_000;
  const totalPrice = orderPrice + deliveryFee;

  const totalQuantity = selectedItemIds.reduce((prev, cur) => {
    const currentCartItem = cartItems?.content.find((it) => it.id === cur);
    if (!currentCartItem) return cur;
    return prev + currentCartItem.quantity;
  }, 0);

  const handleOrderCompleteClick = () => {
    navigate(PATH.main, {
      state: {
        kind: selectedItemIds.length,
        quantity: totalQuantity,
        totalPrice,
      },
    });
  };

  const handleLogoClick = () => {
    navigate(PATH.main);
  };

  const isAllSelected = cartItems?.content.length > 0 && selectedItemIds.length === cartItems.content.length;

  useEffect(() => {
    setSelectedItemIds(cartItems?.content.map((item) => item.id) ?? []);
  }, [cartItems]);

  if (!cartItems) return null;
  return (
    <>
      <Header>
        <Text variant="title-1" color="white" onClick={handleLogoClick}>
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
                  refetch={refetch}
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
          onClick={handleOrderCompleteClick}
          disabled={cartItems.content.length === 0}
        >
          <Text variant="title-3" color="white">
            주문 확인
          </Text>
        </Button>
      </S.ButtonWrapper>
    </>
  );
}
