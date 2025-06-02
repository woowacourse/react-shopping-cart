import { CartItem } from "@/type/CartItem";
import OrderConfirmationList from "@/components/OrderConfirmation/OrderConfirmationList/OrderConfirmationList";
import OrderConfirmationHeader from "@/components/OrderConfirmation/OrderConfirmationHeader/OrderConfirmationHeader";
import OrderConfirmationPreviewCard from "@/components/OrderConfirmation/OrderConfirmationPreviewCard/OrderConfirmationPreviewCard";
import * as Styled from "./OrderConfirmation.style";
import useCouponFetch from "@/hooks/Coupon/useCouponFetch";
import CouponList from "@/components/Coupon/CouponList/CouponList";
import CouponItem from "@/components/Coupon/CouponItem/CouponItem";

import { useState } from "react";
import Modal from "@/components/common/Modal/Modal";
import useCouponSelection from "../../hooks/Coupon/useCouponSelection";

interface OrderConfirmationProps {
  onPrev: () => void;
  selectedCartItems: CartItem[];
}

function OrderConfirmation({
  selectedCartItems,
  onPrev,
}: OrderConfirmationProps) {
  const { couponsData } = useCouponFetch();
  const [isOpen, setIsOpen] = useState(false);

  const { handleSelectCoupon, selectedCouponIds, isSelectedToLimit } =
    useCouponSelection();
  return (
    <>
      <OrderConfirmationHeader handleGoBackToHomeButton={onPrev} />

      <Styled.Container>
        <Styled.Header>
          <Styled.HeaderTitle>주문 확인</Styled.HeaderTitle>
          <Styled.HeaderDescription>
            <span>
              총 {selectedCartItems.length}종류의 상품{" "}
              {selectedCartItems.reduce((acc, item) => acc + item.quantity, 0)}
              개를 주문합니다.
            </span>
            <span>최종 결제 금액을 확인해주세요.</span>
          </Styled.HeaderDescription>
        </Styled.Header>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="center"
        >
          <Modal.Background>
            <Modal.Container size="small" position="center">
              <Modal.Header>쿠폰을 선택해 주세요.</Modal.Header>
              <Modal.Content>
                <CouponList>
                  {couponsData?.map((coupon) => (
                    <CouponItem
                      key={coupon.id}
                      coupon={coupon}
                      onSelect={handleSelectCoupon}
                      isSelected={selectedCouponIds.has(coupon.code)}
                      isLimitReached={isSelectedToLimit}
                    />
                  ))}
                </CouponList>
                <Styled.CouponButton>
                  총 0,000원 할인쿠폰 사용하기
                </Styled.CouponButton>
              </Modal.Content>
            </Modal.Container>
          </Modal.Background>
        </Modal>

        <OrderConfirmationList>
          {selectedCartItems.map((cartItem) => {
            return (
              <OrderConfirmationPreviewCard
                key={cartItem.id}
                cartItem={cartItem}
              />
            );
          })}
        </OrderConfirmationList>
        <Styled.CouponButton onClick={() => setIsOpen(true)}>
          쿠폰 적용
        </Styled.CouponButton>
      </Styled.Container>
    </>
  );
}

export default OrderConfirmation;
