import * as Styled from "./OrderConfirmationContent.style";
import PaymentConfirmButton from "../PaymentConfirmButton/PaymentConfirmButton";
import { CartItem } from "../../../type/CartItem";
import { getSelectedCartItemsCount } from "../../../util/cart/getSelectedCartItemsCount";
import OrderList from "../OrderList/OrderList";
import OrderCard from "../OrderCard/OrderCard";
import ApplyCoupon from "../Coupon/ApplyCoupon/ApplyCoupon";
import { Coupon } from "../../../type/Coupons";

const coupons: Coupon[] = [
  {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2025-11-30",
    discount: 5000,
    minimumAmount: 100000,
    discountType: "fixed",
  },
  {
    id: 2,
    code: "BOGO",
    description: "2개 구매 시 1개 무료 쿠폰",
    expirationDate: "2025-06-30",
    buyQuantity: 2,
    getQuantity: 1,
    discountType: "buyXgetY",
  },
  {
    id: 3,
    code: "FREESHIPPING",
    description: "5만원 이상 구매 시 무료 배송 쿠폰",
    expirationDate: "2025-08-31",
    minimumAmount: 50000,
    discountType: "freeShipping",
  },
  {
    id: 4,
    code: "MIRACLESALE",
    description: "미라클모닝 30% 할인 쿠폰",
    expirationDate: "2025-07-31",
    discount: 30,
    availableTime: {
      start: "04:00:00",
      end: "07:00:00",
    },
    discountType: "percentage",
  },
];

interface OrderConfirmationContentProps {
  selectedCartItems: CartItem[];
}

function OrderConfirmationContent({
  selectedCartItems,
}: OrderConfirmationContentProps) {
  const selectedCartIds = selectedCartItems.map((item) => item.id);
  const selectedCartItemsCount = getSelectedCartItemsCount(selectedCartItems);

  // coupons 가져오기
  // 쿠폰 적용시키기
  // 선택된 쿠폰

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
        handleUseCoupons={() => {}}
      />
      <PaymentConfirmButton
        selectedCartIds={selectedCartIds}
        cartItemsData={selectedCartItems}
      />
    </Styled.Container>
  );
}

export default OrderConfirmationContent;
