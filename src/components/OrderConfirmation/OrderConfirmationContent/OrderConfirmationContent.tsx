import * as Styled from "./OrderConfirmationContent.style";
import PaymentConfirmButton from "../PaymentConfirmButton/PaymentConfirmButton";
import { CartItem } from "../../../type/CartItem";
import { getSelectedCartItemsCount } from "../../../util/cart/getSelectedCartItemsCount";
import OrderList from "../OrderList/OrderList";
import OrderCard from "../OrderCard/OrderCard";
import ApplyCoupon from "../Coupon/ApplyCoupon/ApplyCoupon";
import useCoupons from "../../../hooks/useCoupons/useCoupons";
import useSelectedCoupons from "../../../hooks/useCoupons/useSelectedCoupons";
import ShippingInformation from "../ShippingInformation/ShippingInformation";
import useRemoteAreaShipping from "../../../hooks/useRemoteAreaShipping";
import { calculateCoupons } from "../../../util/coupons/calculateCoupons";
import OrderConfirmationOrderSummary from "../OrderConfirmationOrderSummary/OrderConfirmationOrderSummary";

interface OrderConfirmationContentProps {
  selectedCartItems: CartItem[];
}

function OrderConfirmationContent({
  selectedCartItems,
}: OrderConfirmationContentProps) {
  const selectedCartIds = selectedCartItems.map((item) => item.id);
  const selectedCartItemsCount = getSelectedCartItemsCount(selectedCartItems);
  const { coupons } = useCoupons();
  const { selectedCouponIds, handleUseCoupons } = useSelectedCoupons();
  const { isRemoteAreaShipping, handleToggle } = useRemoteAreaShipping();

  const { maxDiscountedPrice } = calculateCoupons({
    cartItems: selectedCartItems,
    coupons: coupons.filter((coupon) => selectedCouponIds.includes(coupon.id)),
    hasRemoteAreaShipping: isRemoteAreaShipping,
  });

  return (
    <Styled.Container>
      <Styled.Header>주문 확인</Styled.Header>
      <Styled.TextWrapper>
        <Styled.Text>
          총 {selectedCartItems.length}종류의 상품 {selectedCartItemsCount}개를
          주문합니다.
        </Styled.Text>
        <Styled.Text>최종 결제 금액을 확인해주세요.</Styled.Text>
      </Styled.TextWrapper>
      <OrderList>
        {selectedCartItems.map((cartItem) => (
          <OrderCard key={cartItem.id} cartItem={cartItem} />
        ))}
      </OrderList>
      <ApplyCoupon
        coupons={coupons}
        selectedCartItems={selectedCartItems}
        initialSelectedCouponIds={selectedCouponIds}
        isRemoteAreaShipping={isRemoteAreaShipping}
        handleUseCoupons={handleUseCoupons}
      />
      <ShippingInformation
        isRemoteAreaShipping={isRemoteAreaShipping}
        handleToggle={handleToggle}
      />
      <OrderConfirmationOrderSummary
        selectedCartItems={selectedCartItems}
        discountAmount={maxDiscountedPrice}
        isRemoteAreaShipping={isRemoteAreaShipping}
      />
      <PaymentConfirmButton
        selectedCartIds={selectedCartIds}
        cartItemsData={selectedCartItems}
      />
    </Styled.Container>
  );
}

export default OrderConfirmationContent;
