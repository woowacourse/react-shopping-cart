import { Dispatch, SetStateAction } from 'react';
import { CartItemsResponse } from '../../types/cartItems';
import InfoIcon from '../icons/Info';
import Spacing from '../Spacing/Spacing';
import Text from '../Text/Text';
import * as S from './OrderConfirmSection.styles';
import OrderConfirmItem from '../OrderConfirmItem/OrderConfirmItem';
import Checkbox from '../Checkbox/Checkbox';

interface OrderConfirmSectionProps {
  itemsData: {
    items: CartItemsResponse;
    selectedItemIds: number[];
  };
  stateHandlers: {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    setIsIslandChecked: Dispatch<SetStateAction<boolean>>;
    isIslandChecked: boolean;
  };
  priceInfo: {
    orderPrice: number;
    shippingFee: number;
    orderTotalPrice: number;
    totalDiscount: number;
    totalQuantity: number;
    totalPrice: number;
  };
}

export default function OrderConfirmSection({ itemsData, stateHandlers, priceInfo }: OrderConfirmSectionProps) {
  const { items, selectedItemIds } = itemsData;
  const { setIsModalOpen, setIsIslandChecked, isIslandChecked } = stateHandlers;
  const { orderPrice, shippingFee, totalDiscount, totalQuantity, totalPrice } = priceInfo;

  const handleCheckboxChange = () => setIsIslandChecked((prev) => !prev);
  const handleCouponButtonClick = () => setIsModalOpen(true);

  return (
    <S.OrderConfirmSection>
      <Text variant="title-1">주문 확인</Text>

      {items?.content.length === 0 ? (
        <S.EmptyCartWrapper>
          <Text variant="body-1">장바구니에 담긴 상품이 없습니다.</Text>
        </S.EmptyCartWrapper>
      ) : (
        <>
          <Spacing size={8} />
          <Text variant="body-2">
            총 {items?.content.length}종류의 상품 {totalQuantity}개를 주문합니다.
          </Text>
          <Text variant="body-2">최종 결제 금액을 확인해주세요.</Text>
          <Spacing size={32} />

          <S.OrderItemList>
            {items?.content
              .filter((item) => selectedItemIds.includes(item.id))
              .map((item) => (
                <OrderConfirmItem key={item.id} item={item} />
              ))}
          </S.OrderItemList>

          <S.ApplyCouponButton onClick={handleCouponButtonClick}>쿠폰 적용</S.ApplyCouponButton>
          <Spacing size={32} />

          <Text variant="title-3">배송 정보</Text>
          <Spacing size={16} />
          <S.CheckboxWrapper>
            <Checkbox checked={isIslandChecked} onClick={handleCheckboxChange}></Checkbox>
            <Text variant="title-3">제주도 및 도서 산간 지역</Text>
          </S.CheckboxWrapper>
          <Spacing size={32} />
          <p>
            <InfoIcon /> 총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
          </p>
          <hr />
          <S.ReceiptTextWrapper>
            <Text variant="title-2">주문 금액</Text>
            <Text variant="title-1">{orderPrice.toLocaleString()}원</Text>
          </S.ReceiptTextWrapper>
          <S.ReceiptTextWrapper>
            <Text variant="title-2">쿠폰 할인 금액</Text>
            <Text variant="title-1">{'-' + totalDiscount.toLocaleString()}원</Text>
          </S.ReceiptTextWrapper>
          <S.ReceiptTextWrapper>
            <Text variant="title-2">배송비</Text>
            <Text variant="title-1">{shippingFee.toLocaleString()}원</Text>
          </S.ReceiptTextWrapper>
          <S.ReceiptTextWrapper>
            <Text variant="title-2">총 결제 금액</Text>
            <Text variant="title-1">{totalPrice.toLocaleString()}원</Text>
          </S.ReceiptTextWrapper>
        </>
      )}
      <Spacing size={12} />
    </S.OrderConfirmSection>
  );
}
