import { Button, Header, Spacing, Text, useFunnelContext } from "@/components";
import { useCartItemQuery, useCouponQuery } from "@/hooks";
import { CartItemService, CouponService } from "@/services";
import { css } from "@emotion/react";
import { useShoppingCartContext } from "../MainPage/context";
import * as S from "./Step3.styles";

export default function Step3() {
  const { goPrevStep, goToStep } = useFunnelContext();

  const { data: cartItems } = useCartItemQuery();
  const { data: coupons } = useCouponQuery();
  const { selectedCouponIds, isFar } = useShoppingCartContext();

  const cartItemService = new CartItemService(cartItems.content);
  const deliveryFee = cartItemService.calculateDeliveryFee(isFar);
  const totalPrice = cartItemService.calculateTotalPrice();

  const totalType = cartItemService.calculateTotalType();
  const totalQuantity = cartItemService.calculateTotalQuantity();

  const selectedCoupons = coupons?.filter((coupon) => selectedCouponIds.includes(coupon.id));

  const totalDiscountPrice = selectedCoupons?.reduce((acc, coupon) => {
    const couponService = new CouponService(cartItems.content);
    return acc + couponService.calculateDiscountPrice(coupon, isFar);
  }, 0);

  return (
    <main
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <Header onClick={goPrevStep} />

      <S.OrderCompletedSection>
        <Text variant="title-1">결제 확인</Text>
        <Spacing size={27} />
        <Text variant="body-3">
          총 {totalType}종류의 상품 {totalQuantity}개를 주문합니다. <br />
          최종 결제 금액을 확인해 주세요.
        </Text>
        <Spacing size={24} />
        <Text variant="title-3">총 결제 금액</Text>
        <Spacing size={12} />
        <Text variant="title-1">{(totalPrice - totalDiscountPrice + deliveryFee).toLocaleString()}원</Text>
      </S.OrderCompletedSection>

      <S.ButtonWrapper>
        <Button
          css={css`
            width: 100%;
          `}
          onClick={() => goToStep(1)}
        >
          <Text variant="title-3" color="white">
            장바구니로 돌아가기
          </Text>
        </Button>
      </S.ButtonWrapper>
    </main>
  );
}
