import { Spacing, Text } from "@/components";
import { useCartItemQuery, useCouponQuery } from "@/hooks";
import { useShoppingCartContext } from "@/pages/ShoppingCartPage/contexts";
import { CartItemService, CouponService } from "@/services";
import * as S from "./OrderCompletedSection.styles";

export default function OrderCompletedSection() {
  const { selectedCouponIds, isFar, selectedItemIds } = useShoppingCartContext();
  const { data: cartItems } = useCartItemQuery();
  const { data: coupons } = useCouponQuery();

  const selectedCartItems = cartItems.content.filter((item) => selectedItemIds.includes(item.id));
  const selectedCoupons = coupons?.filter((coupon) => selectedCouponIds.includes(coupon.id));

  const cartItemService = new CartItemService(selectedCartItems);

  const typeCount = cartItemService.calculateTypeCount();
  const deliveryFee = cartItemService.calculateDeliveryFee(isFar);
  const orderAmount = cartItemService.calculateOrderAmount();
  const totalQuantity = cartItemService.calculateTotalQuantity();
  const totalDiscountAmount = CouponService.calculateTotalDiscountAmount(selectedCartItems, selectedCoupons, isFar);

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
