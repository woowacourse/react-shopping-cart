import { Spacing, Text } from "@/components";
import { useCartItemQuery, useCouponQuery } from "@/hooks";
import { useShoppingCartContext } from "@/pages/ShoppingCartPage/contexts";
import { CartItemService, CouponService } from "@/services";
import * as S from "./OrderCompletedSection.styles";

export default function OrderCompletedSection() {
  const { data: cartItems } = useCartItemQuery();
  const { data: coupons } = useCouponQuery();
  const { selectedCouponIds, isFar } = useShoppingCartContext();

  const cartItemService = new CartItemService(cartItems.content);
  const deliveryFee = cartItemService.calculateDeliveryFee(isFar);
  const orderAmount = cartItemService.calculateOrderAmount();

  const typeCount = cartItemService.calculateTypeCount();
  const totalQuantity = cartItemService.calculateTotalQuantity();

  const selectedCoupons = coupons?.filter((coupon) => selectedCouponIds.includes(coupon.id));

  const totalDiscountAmount = selectedCoupons?.reduce((acc, coupon) => {
    const couponService = new CouponService(cartItems.content);
    return acc + couponService.calculateDiscountPrice(coupon, isFar);
  }, 0);

  return (
    <S.OrderCompletedSection>
      <Text variant="title-1">결제 확인</Text>

      <Spacing size={24} />

      <Text variant="body-3">
        총 {typeCount}종류의 상품 {totalQuantity}개를 주문합니다. <br />
        최종 결제 금액을 확인해 주세요.
      </Text>

      <Spacing size={24} />

      <Text variant="title-3">총 결제 금액</Text>

      <Spacing size={12} />

      <Text variant="title-1">{(orderAmount - totalDiscountAmount + deliveryFee).toLocaleString()}원</Text>
    </S.OrderCompletedSection>
  );
}
