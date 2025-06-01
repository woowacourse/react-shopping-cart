import { css } from "@emotion/react";
import { useNavigate } from "react-router";
import { getCartItem } from "@/apis/cartItem";
import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import ShoppingCartSection from "@/components/ShoppingCartSection/ShoppingCartSection";
import * as S from "./ShoppingCartPage.styles";
import { useState } from "react";
import { CartItemsResponse, Content } from "@/types/cartItems";
import { useQuery } from "@/modules";
import { PATH } from "@/constants/path";
import Text from "@/components/Text/Text";

export default function ShoppingCartPage() {
  const { data, refetch } = useQuery<CartItemsResponse>({
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
    if (data?.content.length === selectedItemIds.length) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(data?.content.map((item) => item.id) ?? []);
    }
  };

  const orderPrice =
    data?.content.reduce((total, item) => {
      const calculateItemPrice = (item: Content) => {
        if (selectedItemIds.includes(item.id)) {
          return item.product.price * item.quantity;
        }
        return 0;
      };

      return total + calculateItemPrice(item);
    }, 0) || 0;
  const shippingFee = orderPrice >= 100000 ? 0 : 3000;
  const totalPrice = orderPrice + shippingFee;

  const totalQuantity = selectedItemIds.reduce((prev, cur) => {
    const currentCartItem = data?.content.find((it) => it.id === cur);
    if (!currentCartItem) return cur;
    return prev + currentCartItem.quantity;
  }, 0);

  const handleNavigateClick = () => {
    navigate(PATH.ORDER_COMPLETE, {
      state: {
        kind: selectedItemIds.length,
        quantity: totalQuantity,
        totalPrice,
      },
    });
  };

  if (!data) return null;
  return (
    <>
      <Header>
        <Text variant="title-1" color="white">
          SHOP
        </Text>
      </Header>
      <ShoppingCartSection
        shopppingCartItems={data}
        refetch={refetch}
        selectedItemIds={selectedItemIds}
        onSelectItem={handleSelectItem}
        onSelectAll={handleSelectAll}
        orderPrice={orderPrice}
        shippingFee={shippingFee}
        totalPrice={totalPrice}
      />
      <S.ButtonWrapper>
        <Button
          css={css`
            height: 48px;
          `}
          isDisabled={data?.content.length === 0}
          onClick={handleNavigateClick}
        >
          주문 확인
        </Button>
      </S.ButtonWrapper>
    </>
  );
}
