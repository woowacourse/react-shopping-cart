import { Coupon } from "@/apis/coupon/coupon.type";
import InfoText from "@/shared/components/InfoText/InfoText";
import Modal from "@/shared/components/Modal/Modal";
import * as S from "./ApplyCouponModal.styled";
import CouponList from "./CouponList/CouponList";
import CouponItem from "./CouponList/CouponItem/CouponItem";
import { useSelectedCoupon } from "@/pages/order-confirm/hooks/useSelectedCoupon";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { MAX_SELECTED_COUPON_COUNT } from "@/domains/constants/coupon";

type ApplyCouponModalProps = {
  isOpen: boolean;
  orderList: CartItemType[];
  couponList: Coupon[];
  deliveryPrice: number;
  onRequestClose: () => void;
  onApplyCoupon: (couponIds: number[]) => void;
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
    getSelectedIds,
    getIsSelectedId,
    toggleSelectedId,
    getIsCouponIdDisabled,
    couponDiscount,
  } = useSelectedCoupon({ orderList, couponList, deliveryPrice });

  const handleApplyCouponButtonClick = () => {
    onApplyCoupon(getSelectedIds());
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
        총 {couponDiscount.toLocaleString()}원 할인 쿠폰 사용하기
      </S.ApplyButton>
    </Modal>
  );
}
