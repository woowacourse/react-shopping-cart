import { useEffect, useState } from 'react';
import { CartItemsResponse } from '../../types/cartItems';
import CartItem from '../CartItem/CartItem';
import Checkbox from '../Checkbox/Checkbox';
import InfoIcon from '../icons/Info';
import Spacing from '../Spacing/Spacing';
import Text from '../Text/Text';
import * as S from './ShoppingCartSection.styles';

interface ShoppingCartSectionProps {
  items: CartItemsResponse;
}

export default function ShoppingCartSection({ items }: ShoppingCartSectionProps) {
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);
  const isAllSelected = items?.content.length > 0 && selectedItemIds.length === items.content.length;

  const orderPrice =
    items?.content.reduce(
      (total, item) => (selectedItemIds.includes(item.id) ? total + item.product.price * item.quantity : total),
      0
    ) || 0;
  const shippingFee = orderPrice >= 100000 ? 0 : 3000;
  const totalPrice = orderPrice + shippingFee;

  useEffect(() => {
    if (!items) return;
    setSelectedItemIds(() => items.content.map((item) => item.id));
  }, [items]);

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
      <Spacing size={8} />
      <Text variant="body-2">현재 {2}종류의 상품이 담겨있습니다.</Text>
      <Spacing size={32} />

      <Checkbox checked={isAllSelected} onClick={handleAllCheckBox} />

      {items?.content.map((item) => (
        <CartItem
          key={item.id}
          cartItem={item}
          isSelected={selectedItemIds.includes(item.id)}
          handleCheckboxClick={() => handleCheckboxClick(item.id)}
        />
      ))}

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
        <Text variant="title-1">{totalPrice}원</Text>
      </S.ReceiptTextWrapper>
    </S.ShoppingCartSection>
  );
}
