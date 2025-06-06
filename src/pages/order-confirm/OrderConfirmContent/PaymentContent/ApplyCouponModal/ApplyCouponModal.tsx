import { Coupon } from "@/apis/coupon/coupon.type";
import InfoText from "@/shared/components/InfoText/InfoText";
import Modal from "@/shared/components/Modal";
import * as S from "./ApplyCouponModal.styled";
import CouponList from "./CouponList/CouponList";
import CouponItem from "./CouponList/CouponItem/CouponItem";
import { getCouponInfo } from "./utils/getCouponInfo";

type ApplyCouponModalProps = {
  isOpen: boolean;
  couponList: Coupon[];
  onRequestClose: () => void;
  onApplyCoupon: () => void;
};

export default function ApplyCouponModal({
  isOpen,
  couponList,
  onRequestClose,
  onApplyCoupon,
}: ApplyCouponModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <Modal title="쿠폰을 선택해 주세요" onRequestClose={onRequestClose}>
      <S.ApplyCouponModalContainer>
        <InfoText>쿠폰은 최대 2개까지 사용할 수 있습니다.</InfoText>
        <CouponList>
          {couponList.map((coupon) => (
            <CouponItem
              key={coupon.id}
              coupon={coupon}
              couponInfoList={getCouponInfo(coupon)}
            />
          ))}
        </CouponList>
      </S.ApplyCouponModalContainer>
      <S.ApplyButton type="button" onClick={onApplyCoupon}>
        총 {"6,000원"} 할인 쿠폰 사용하기
      </S.ApplyButton>
    </Modal>
  );
}
