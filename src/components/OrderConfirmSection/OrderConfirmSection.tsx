import { Dispatch, SetStateAction } from 'react';
import { CartItemsResponse } from '../../types/cartItems';
import Text from '../Text/Text';
import * as S from './OrderConfirmSection.styles';
import OrderConfirmItem from '../OrderConfirmItem/OrderConfirmItem';
import Checkbox from '../Checkbox/Checkbox';
import InfoIcon from '../icons/Info';
import Spacing from '../Spacing/Spacing';

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

function OrderSummary({ itemsCount, totalQuantity }: { itemsCount: number; totalQuantity: number }) {
  return (
    <>
      <Spacing size={8} />
      <Text variant="body-2">
        총 {itemsCount}종류의 상품 {totalQuantity}개를 주문합니다.
      </Text>
      <Text variant="body-2">최종 결제 금액을 확인해주세요.</Text>
      <Spacing size={32} />
    </>
  );
}

function OrderItemList({ items, selectedItemIds }: { items: CartItemsResponse; selectedItemIds: number[] }) {
  return (
    <S.OrderItemList>
      {items.content
        .filter((item) => selectedItemIds.includes(item.id))
        .map((item) => (
          <OrderConfirmItem key={item.id} item={item} />
        ))}
    </S.OrderItemList>
  );
}

function CouponApplyButton({ onClick }: { onClick: () => void }) {
  return (
    <>
      <S.ApplyCouponButton onClick={onClick}>쿠폰 적용</S.ApplyCouponButton>
      <Spacing size={32} />
    </>
  );
}

function ShippingInfo({ isChecked, onChange }: { isChecked: boolean; onChange: () => void }) {
  return (
    <>
      <Text variant="title-3">배송 정보</Text>
      <Spacing size={16} />
      <S.CheckboxWrapper>
        <Checkbox checked={isChecked} onClick={onChange} />
        <Text variant="title-3">제주도 및 도서 산간 지역</Text>
      </S.CheckboxWrapper>
      <Spacing size={32} />
      <p>
        <InfoIcon /> 총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
      </p>
      <hr />
    </>
  );
}

function PriceSummary({
  orderPrice,
  totalDiscount,
  shippingFee,
  totalPrice,
}: {
  orderPrice: number;
  totalDiscount: number;
  shippingFee: number;
  totalPrice: number;
}) {
  return (
    <>
      <S.ReceiptTextWrapper>
        <Text variant="title-2">주문 금액</Text>
        <Text variant="title-1">{orderPrice.toLocaleString()}원</Text>
      </S.ReceiptTextWrapper>
      <S.ReceiptTextWrapper>
        <Text variant="title-2">쿠폰 할인 금액</Text>
        <Text variant="title-1">{`-${totalDiscount.toLocaleString()}원`}</Text>
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
  );
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
          <OrderSummary itemsCount={items.content.length} totalQuantity={totalQuantity} />
          <OrderItemList items={items} selectedItemIds={selectedItemIds} />
          <CouponApplyButton onClick={handleCouponButtonClick} />
          <ShippingInfo isChecked={isIslandChecked} onChange={handleCheckboxChange} />
          <PriceSummary
            orderPrice={orderPrice}
            totalDiscount={totalDiscount}
            shippingFee={shippingFee}
            totalPrice={totalPrice}
          />
        </>
      )}

      <Spacing size={12} />
    </S.OrderConfirmSection>
  );
}
