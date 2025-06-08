import { Dispatch, SetStateAction, useMemo } from 'react';
import { CartItemsResponse } from '../../types/cartItems';
import CartItem from '../CartItem/CartItem';
import Checkbox from '../Checkbox/Checkbox';
import InfoIcon from '../icons/Info';
import Spacing from '../Spacing/Spacing';
import Text from '../Text/Text';
import * as S from './ShoppingCartSection.styles';
import { calculateOrderPriceAndShipping } from '../../utils/orderCalculate';

interface ShoppingCartSectionProps {
  items: CartItemsResponse;

  refetch: () => void;
  selectedItemIds: number[];
  setSelectedItemIds: Dispatch<SetStateAction<number[]>>;
}

export default function ShoppingCartSection({
  items,
  refetch,
  selectedItemIds,
  setSelectedItemIds,
}: ShoppingCartSectionProps) {
  const selectedItems = useMemo(() => {
    return items.content.filter((item) => selectedItemIds.includes(item.id));
  }, [items, selectedItemIds]);

  const isAllSelected = useMemo(() => {
    return items?.content.length > 0 && selectedItemIds.length === items.content.length;
  }, [items, selectedItemIds]);

  const { orderPrice, shippingFee, orderTotalPrice } = useMemo(
    () => calculateOrderPriceAndShipping(items.content, false),
    [selectedItems]
  );

  const handleCheckboxClick = (itemId: number) => {
    setSelectedItemIds((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
  };
  const handleAllCheckBox = () => {
    if (isAllSelected) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(items.content.map((item) => item.id));
    }
  };

  return (
    <S.ShoppingCartSection>
      <Text variant="title-1">장바구니</Text>

      {items?.content.length === 0 ? (
        <S.EmptyCartWrapper>
          <Text variant="body-1">장바구니에 담긴 상품이 없습니다.</Text>
        </S.EmptyCartWrapper>
      ) : (
        <>
          <Spacing size={8} />
          <Text variant="body-2">현재 {items?.content.length}종류의 상품이 담겨있습니다.</Text>
          <Spacing size={32} />

          <S.CheckboxWrapper>
            <Checkbox checked={isAllSelected} onClick={handleAllCheckBox} />
            <Spacing size={8} />
            <Text variant="body-3">전체 선택</Text>
          </S.CheckboxWrapper>

          <S.CartItemList>
            {items?.content.map((item) => (
              <CartItem
                key={item.id}
                cartItem={item}
                isSelected={selectedItemIds.includes(item.id)}
                handleCheckboxClick={() => handleCheckboxClick(item.id)}
                refetch={refetch}
              />
            ))}
          </S.CartItemList>

          <p>
            <InfoIcon /> 총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
          </p>
          <hr />
          <S.ReceiptTextWrapper>
            <Text variant="title-2">주문 금액</Text>
            <Text variant="title-1">{orderPrice}원</Text>
          </S.ReceiptTextWrapper>
          <S.ReceiptTextWrapper>
            <Text variant="title-2">배송비</Text>
            <Text variant="title-1">{shippingFee}원</Text>
          </S.ReceiptTextWrapper>
          <S.ReceiptTextWrapper>
            <Text variant="title-2">총 결제 금액</Text>
            <Text variant="title-1">{orderTotalPrice}원</Text>
          </S.ReceiptTextWrapper>
        </>
      )}
      <Spacing size={12} />
    </S.ShoppingCartSection>
  );
}
