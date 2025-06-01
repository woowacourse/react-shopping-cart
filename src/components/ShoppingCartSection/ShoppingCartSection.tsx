import { CartItemsResponse } from "@/types/cartItems";
import { CartItem, Checkbox, Info, Spacing, Text } from "@/components";
import * as S from "./ShoppingCartSection.styles";

interface ShoppingCartSectionProps {
  shopppingCartItems: CartItemsResponse;
  refetch: () => void;
  selectedItemIds: number[];
  onSelectItem: (itemId: number) => void;
  onSelectAll: () => void;
  orderPrice: number;
  deliveryFee: number;
  totalPrice: number;
}

export default function ShoppingCartSection({
  shopppingCartItems,
  refetch,
  selectedItemIds,
  onSelectItem,
  onSelectAll,
  orderPrice,
  deliveryFee,
  totalPrice,
}: ShoppingCartSectionProps) {
  const isAllSelected =
    shopppingCartItems?.content.length > 0 &&
    selectedItemIds.length === shopppingCartItems.content.length;

  return (
    <S.ShoppingCartSection>
      <Text variant="title-1">장바구니</Text>

      {shopppingCartItems?.content.length === 0 ? (
        <S.EmptyCartWrapper>
          <Text variant="body-1">장바구니에 담긴 상품이 없습니다.</Text>
        </S.EmptyCartWrapper>
      ) : (
        <>
          <Spacing size={8} />
          <Text variant="body-2">현재 {2}종류의 상품이 담겨있습니다.</Text>
          <Spacing size={32} />

          <S.CheckboxWrapper>
            <Checkbox checked={isAllSelected} onClick={onSelectAll} />
            <Spacing size={8} />
            <Text variant="body-3">전체 선택</Text>
          </S.CheckboxWrapper>

          <S.CartItemList>
            {shopppingCartItems?.content.map((item) => (
              <CartItem
                key={item.id}
                cartItem={item}
                isSelected={selectedItemIds.includes(item.id)}
                handleCheckboxClick={() => onSelectItem(item.id)}
                refetch={refetch}
              />
            ))}
          </S.CartItemList>

          <p>
            <Info /> 총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
          </p>
          <hr />
          <S.ReceiptTextWrapper>
            <Text variant="title-2">주문 금액</Text>
            <Text variant="title-1">{orderPrice.toLocaleString()}원</Text>
          </S.ReceiptTextWrapper>
          <S.ReceiptTextWrapper>
            <Text variant="title-2">배송비</Text>
            <Text variant="title-1">{deliveryFee.toLocaleString()}원</Text>
          </S.ReceiptTextWrapper>
          <S.ReceiptTextWrapper>
            <Text variant="title-2">총 결제 금액</Text>
            <Text variant="title-1">{totalPrice.toLocaleString()}원</Text>
          </S.ReceiptTextWrapper>
        </>
      )}
      <Spacing size={12} />
    </S.ShoppingCartSection>
  );
}
