import { Button, Card, Checkbox, InfoIcon, Modal, SpaceBetweenFlex, Spacing, Text } from "@/components";
import { FREE_DELIVERY_PRICE } from "@/constants";
import { useCartItemQuery, useCouponQuery } from "@/hooks";
import { useShoppingCartContext } from "@/pages/ShoppingCartPage/contexts";
import { CartItemService, CouponService } from "@/services";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import CouponModal from "../CouponModal/CouponModal";
import * as S from "./OrderConfirmSection.styles";
import { isEqual } from "@/utils";

export default function OrderConfirmSection() {
  const { selectedItemIds, isFar, setIsFar, selectedCouponIds, setSelectedCouponIds } = useShoppingCartContext();
  const { data: coupons } = useCouponQuery();
  const [isOpen, setIsOpen] = useState(false);

  const { data: cartItems } = useCartItemQuery();
  const selectedCartItems = cartItems.content.filter((item) => selectedItemIds.includes(item.id));

  const cartItemService = new CartItemService(selectedCartItems);
  const deliveryFee = cartItemService.calculateDeliveryFee(isFar);
  const orderAmount = cartItemService.calculateOrderAmount();

  const typeCount = cartItemService.calculateTypeCount();
  const totalQuantity = cartItemService.calculateTotalQuantity();

  const selectedCoupons = coupons?.filter((coupon) => selectedCouponIds.includes(coupon.id));

  const totalDiscountAmount = CouponService.calculateTotalDiscountAmount(selectedCartItems, selectedCoupons, isFar);

  const totalPaymentAmount = orderAmount - totalDiscountAmount + deliveryFee;

  const closeModal = () => setIsOpen(false);


  useEffect(() => {
    const availableCoupons = coupons?.filter((coupon) => new CouponService(selectedCartItems).canAdjustCoupon(coupon));
    const mostDiscountCombination = CouponService.calculateMostDiscountCombination(
      selectedCartItems,
      availableCoupons,
      isFar,
    );
    const newCouponIds = mostDiscountCombination?.map((coupon) => coupon.id) || [];

    if (isEqual(selectedCouponIds, newCouponIds)) return;

    setSelectedCouponIds(newCouponIds);
  }, [coupons, selectedCartItems, isFar, selectedCouponIds, setSelectedCouponIds]);

  return (
    <S.OrderConfirmSectionWrapper>
      <Text variant="title-1">주문 확인</Text>

      <Spacing size={28} />

      <Text variant="body-1">
        총 {typeCount}종류의 상품 {totalQuantity}개를 주문합니다.
        <br />
        최종 결제 금액을 확인해 주세요.
      </Text>

      <Spacing size={28} />

      {selectedCartItems.map((item) => (
        <Card key={item.id}>
          <Card.Image src={item.product.imageUrl} alt={item.product.name} />
          <Card.Info>
            <Card.Name>{item.product.name}</Card.Name>
            <Card.Description>{item.product.price.toLocaleString()}원</Card.Description>
            <Text variant="body-1">{item.quantity}개</Text>
          </Card.Info>
        </Card>
      ))}

      <Spacing size={16} />

      <Button
        css={css`
          width: 100%;
        `}
        variant="outlined"
        onClick={() => setIsOpen(true)}
      >
        쿠폰 적용
      </Button>

      <Modal.Wrapper isOpen={isOpen} onClose={closeModal}>
        <CouponModal closeModal={closeModal} />
      </Modal.Wrapper>

      <Spacing size={32} />

      <Text variant="title-3">배송 정보</Text>

      <Spacing size={16} />

      <S.CheckboxWrapper onClick={() => setIsFar(!isFar)}>
        <Checkbox checked={isFar} />
        <Text variant="body-1">제주도 및 도서 산간 지역</Text>
      </S.CheckboxWrapper>

      <Spacing size={32} />

      <Text
        variant="body-1"
        css={css`
          display: flex;
          align-items: center;
          gap: 4px;
        `}
      >
        <InfoIcon /> 총 주문 금액이 {FREE_DELIVERY_PRICE.toLocaleString()}원 이상일 경우 무료 배송됩니다.
      </Text>

      <hr />

      <S.ReceiptWrapper>
        <SpaceBetweenFlex>
          <Text variant="title-3">주문 금액</Text>
          <Text variant="title-1">{orderAmount.toLocaleString()}원</Text>
        </SpaceBetweenFlex>
        <SpaceBetweenFlex>
          <Text variant="title-3">쿠폰 할인 금액</Text>
          <Text variant="title-1">{totalDiscountAmount?.toLocaleString()}원</Text>
        </SpaceBetweenFlex>
        <SpaceBetweenFlex>
          <Text variant="title-3">배송비</Text>
          <Text variant="title-1">{deliveryFee.toLocaleString()}원</Text>
        </SpaceBetweenFlex>

        <hr />

        <SpaceBetweenFlex>
          <Text variant="title-3">총 결제 금액</Text>
          <Text variant="title-1">{totalPaymentAmount.toLocaleString()}원</Text>
        </SpaceBetweenFlex>
      </S.ReceiptWrapper>
    </S.OrderConfirmSectionWrapper>
  );
}
