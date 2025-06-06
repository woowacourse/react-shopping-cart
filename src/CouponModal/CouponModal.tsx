import Checkbox from "../components/@common/Checkbox/Checkbox";
import InfoMessage from "../components/InfoMessage/InfoMessage";
import Modal from "../components/Modal/Modal";
import { Coupon } from "../types/response";
import * as S from "./CouponModal.styles";

interface CouponModalProps {
  isOpen: boolean;
  coupons: Coupon[];
  onClose: () => void;
  onApply: (selectedCoupons: Coupon[]) => void;
}

const CouponModal = ({
  isOpen,
  coupons,
  onClose,
  onApply,
}: CouponModalProps) => {
  const handleApplyClick = () => {
    // TODO: 선택된 쿠폰 추출 후 넘기기
    onApply([]); // 임시
    onClose();
  };

  return (
    <Modal position="center" isOpen={isOpen} onClose={onClose}>
      <div>
        <S.Label>쿠폰을 선택해 주세요</S.Label>
        <InfoMessage message="쿠폰은 최대 2개까지 사용할 수 있습니다." />
        <S.CouponContainer>
          {coupons.map((coupon) => (
            <S.CouponItem key={coupon.id}>
              <Checkbox checked={false} />
              <S.Label>{coupon.description}</S.Label>
              <S.CouponDescription>
                만료일: {coupon.expirationDate}
              </S.CouponDescription>
              {coupon.minimumAmount && (
                <S.CouponDescription>
                  최소 주문 금액: {coupon.minimumAmount.toLocaleString()}원
                </S.CouponDescription>
              )}
              {coupon.availableTime && (
                <S.CouponDescription>
                  사용 가능 시간: {coupon.availableTime.start} ~{" "}
                  {coupon.availableTime.end}
                </S.CouponDescription>
              )}
            </S.CouponItem>
          ))}
        </S.CouponContainer>
        <S.ButtonContainer>
          <S.Button onClick={handleApplyClick}>
            총 6000원 할인 쿠폰 사용하기
          </S.Button>
        </S.ButtonContainer>
      </div>
    </Modal>
  );
};

export default CouponModal;
