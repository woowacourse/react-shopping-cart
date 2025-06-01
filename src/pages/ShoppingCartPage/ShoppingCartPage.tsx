import { getCartItem } from "@/apis";
import { Button, Header, Text } from "@/components";
import { PATH } from "@/constants";
import { useQuery } from "@/modules";
import { CartItemsResponse } from "@/types";
import { css } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as S from "./ShoppingCartPage.styles";
import { ShoppingCartSection } from "./components";

export default function ShoppingCartPage() {
  const { data: cartItems, refetch } = useQuery<CartItemsResponse>({
    queryKey: "cartItem",
    queryFn: () => getCartItem({ page: 0, size: 50 }),
  });
  const navigate = useNavigate();
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);

  // 개별 아이템 선택/해제
  const handleSelectItem = (itemId: number) => {
    setSelectedItemIds((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  // 전체 선택/해제
  const handleSelectAll = () => {
    if (cartItems?.content.length === selectedItemIds.length)
      setSelectedItemIds([]);
    else setSelectedItemIds(cartItems?.content.map((item) => item.id) ?? []);
  };

  const orderPrice =
    cartItems?.content.reduce(
      (total, item) =>
        total +
        (selectedItemIds.includes(item.id)
          ? item.product.price * item.quantity
          : 0),
      0
    ) || 0;
  const deliveryFee = orderPrice >= 100_000 ? 0 : 3_000;
  const totalPrice = orderPrice + deliveryFee;

  const totalQuantity = selectedItemIds.reduce((prev, cur) => {
    const currentCartItem = cartItems?.content.find((it) => it.id === cur);
    if (!currentCartItem) return cur;
    return prev + currentCartItem.quantity;
  }, 0);

  const handleOrderCompleteClick = () => {
    navigate(PATH.ORDER_COMPLETE, {
      state: {
        kind: selectedItemIds.length,
        quantity: totalQuantity,
        totalPrice,
      },
    });
  };

  if (!cartItems) return null;
  return (
    <>
      <Header>
        <Text variant="title-1" color="white">
          SHOP
        </Text>
      </Header>
      <ShoppingCartSection
        shopppingCartItems={cartItems}
        refetch={refetch}
        selectedItemIds={selectedItemIds}
        onSelectItem={handleSelectItem}
        onSelectAll={handleSelectAll}
        orderPrice={orderPrice}
        deliveryFee={deliveryFee}
        totalPrice={totalPrice}
      />
      <S.ButtonWrapper>
        <Button
          css={css`
            height: 48px;
          `}
          isDisabled={cartItems?.content.length === 0}
          onClick={handleOrderCompleteClick}
        >
          주문 확인
        </Button>
      </S.ButtonWrapper>
    </>
  );
}
