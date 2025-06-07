import { Coupon } from "@/apis/coupon/coupon.type";
import InfoText from "@/shared/components/InfoText/InfoText";
import Modal from "@/shared/components/Modal";
import * as S from "./ApplyCouponModal.styled";
import CouponList from "./CouponList/CouponList";
import CouponItem from "./CouponList/CouponItem/CouponItem";
import { useCoupon } from "@/pages/order-confirm/hooks/useCoupon";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { useEffect } from "react";
import { MAX_SELECTED_COUPON_COUNT } from "@/domains/constants/coupon";

type ApplyCouponModalProps = {
  isOpen: boolean;
  orderList: CartItemType[];
  couponList: Coupon[];
  deliveryPrice: number;
  onRequestClose: () => void;
  onApplyCoupon: (discount: number) => void;
};

export default function ApplyCouponModal({
  isOpen,
  orderList,
  couponList,
  deliveryPrice,
  onRequestClose,
  onApplyCoupon,
}: ApplyCouponModalProps) {
  const {
    getIsSelectedId,
    toggleSelectedId,
    getIsCouponIdDisabled,
    discountAmount,
  } = useCoupon({ orderList, couponList, deliveryPrice });

  useEffect(
    function autoSelectMaxDiscount() {
      onApplyCoupon(discountAmount);
    },
    // 자동 적용은 처음 시점에만 이루어지며, 이후 사용자가 쿠폰을 선택할 수 있도록 함
    // discountAmount를 의존성 배열에 넣으면 쿠폰을 적용하지 않아도 할인 금액에 반영되기 때문에 포함하지 않음
    // 배송비에 따라 쿠폰 할인율이 달라질 수 있으므로 의존성 배열에 배송비 추가
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deliveryPrice]
  );

  const handleApplyCouponButtonClick = () => {
    onApplyCoupon(discountAmount);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title="쿠폰을 선택해 주세요"
      onRequestClose={onRequestClose}
    >
      <S.ApplyCouponModalContainer>
        <InfoText>
          쿠폰은 최대 {MAX_SELECTED_COUPON_COUNT}개까지 사용할 수 있습니다.
        </InfoText>
        <CouponList>
          {couponList.map((coupon) => (
            <CouponItem
              key={coupon.id}
              coupon={coupon}
              isSelected={getIsSelectedId(coupon.id)}
              isDisabled={getIsCouponIdDisabled(coupon.id)}
              onCheck={toggleSelectedId}
            />
          ))}
        </CouponList>
      </S.ApplyCouponModalContainer>
      <S.ApplyButton type="button" onClick={handleApplyCouponButtonClick}>
        총 {discountAmount.toLocaleString()}원 할인 쿠폰 사용하기
      </S.ApplyButton>
    </Modal>
  );
}
