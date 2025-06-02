import { CartItem } from "@/type/CartItem";
import OrderConfirmationList from "@/components/OrderConfirmation/OrderConfirmationList/OrderConfirmationList";
import OrderConfirmationHeader from "@/components/OrderConfirmation/OrderConfirmationHeader/OrderConfirmationHeader";
import OrderConfirmationPreviewCard from "@/components/OrderConfirmation/OrderConfirmationPreviewCard/OrderConfirmationPreviewCard";
import * as Styled from "./OrderConfirmation.style";

import CouponList from "@/components/Coupon/CouponList/CouponList";
import CouponItem from "@/components/Coupon/CouponItem/CouponItem";

import { useMemo, useState } from "react";
import Modal from "@/components/common/Modal/Modal";
import useCouponSelection from "../../hooks/Coupon/useCouponSelection";
import useCouponApply from "@/hooks/Coupon/useCouponApply";
import { validateCoupon } from "@/util/validateCoupon";
import { Coupon } from "@/type/Coupon";

interface OrderConfirmationProps {
  onPrev: () => void;
  selectedCartItems: CartItem[];
  result: ReturnType<typeof useCouponApply>;
  couponsData: Coupon[] | null;
}

function OrderConfirmation({
  selectedCartItems,
  onPrev,
  result,
  couponsData,
}: OrderConfirmationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const initialIds = useMemo(
    () => new Set(result.appliedCoupons.map((c) => c.coupon.id)),
    [result.appliedCoupons]
  );
  const invalidCoupons = useMemo(
    () =>
      couponsData?.filter(
        (c) => !validateCoupon(c, selectedCartItems, result.orderTotal).isValid
      ),
    [couponsData, selectedCartItems, result.orderTotal]
  );

  const { handleSelectCoupon, selectedCouponIds, isSelectedToLimit } =
    useCouponSelection(initialIds);

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
                      isSelected={selectedCouponIds.has(coupon.id)}
                      isLimitReached={isSelectedToLimit}
                      isInvalid={invalidCoupons?.some(
                        (c) => c.id === coupon.id
                      )}
                    />
                  ))}
                </CouponList>
                <Styled.CouponButton
                  disabled={result.discountTotal === 0}
                  onClick={() => setIsOpen(false)}
                >
                  총 {result.discountTotal.toLocaleString()}원 할인쿠폰 사용하기
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
        <Styled.OrderPriceDetails>
          <Styled.OrderWrapper>
            <Styled.OrderTotalTitle>총 결제 금액</Styled.OrderTotalTitle>
            <Styled.OrderTotalPrice>
              {result.orderTotal.toLocaleString()}원
            </Styled.OrderTotalPrice>
          </Styled.OrderWrapper>
          <Styled.OrderWrapper>
            <Styled.DiscountTotalTitle>
              쿠폰 할인 금액
            </Styled.DiscountTotalTitle>
            <Styled.DiscountTotalPrice>
              -{result.discountTotal.toLocaleString()}원
            </Styled.DiscountTotalPrice>
          </Styled.OrderWrapper>

          <Styled.OrderWrapper>
            <Styled.FinalTotalTitle>총 결제 금액</Styled.FinalTotalTitle>
            <Styled.FinalTotalPrice>
              {(result.orderTotal - result.discountTotal).toLocaleString()}원
            </Styled.FinalTotalPrice>
          </Styled.OrderWrapper>
        </Styled.OrderPriceDetails>
      </Styled.Container>
    </>
  );
}

export default OrderConfirmation;
