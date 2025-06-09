import Checkbox from "../@common/Checkbox/Checkbox";
import Description from "../@common/Description/Description";
import InfoMessage from "../InfoMessage/InfoMessage";
import Modal from "../Modal/Modal";
import { Coupon } from "../../types/response";
import * as S from "./CouponModal.styles";
import InfoIcon from "/Info.svg";
import useCoupons from "../../hooks/useCoupons";
import { useCouponContext } from "../../hooks/useCouponContext";
import CloseImage from "/close-button.svg";

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CouponModal = ({ isOpen, onClose }: CouponModalProps) => {
  const { coupons } = useCoupons();
  const { selectedCoupons, setSelectedCoupons, totalDiscount } =
    useCouponContext();

  const handleToggle = (coupon: Coupon) => {
    const updated = selectedCoupons.some((c) => c.id === coupon.id)
      ? selectedCoupons.filter((c) => c.id !== coupon.id)
      : [...selectedCoupons, coupon];
    setSelectedCoupons(updated);
  };

  return (
    <Modal position="center" isOpen={isOpen} onClose={onClose}>
      <S.ModalHeader>
        <Modal.Title>쿠폰을 선택해 주세요</Modal.Title>
        <S.CloseButton onClick={onClose}>
          <S.CloseImage src={CloseImage} alt="close" />
        </S.CloseButton>
      </S.ModalHeader>

      <InfoMessage
        message="쿠폰은 최대 2개까지 사용할 수 있습니다."
        imageSrc={InfoIcon}
        imageAlt="info"
      />

      <S.CouponContainer>
        {coupons.map((coupon) => {
          const isSelected = selectedCoupons.some((c) => c.id === coupon.id);
          return (
            <S.CouponItem key={coupon.id} $disabled={!coupon.isAvailable}>
              <S.LabelContainer>
                <Checkbox
                  checked={isSelected}
                  onClick={() => coupon.isAvailable && handleToggle(coupon)}
                />
                <S.Label>{coupon.description}</S.Label>
              </S.LabelContainer>
              <Description>만료일: {coupon.expirationDate}</Description>
              {coupon.minimumAmount && (
                <Description>
                  최소 주문 금액: {coupon.minimumAmount.toLocaleString()}원
                </Description>
              )}
              {coupon.availableTime && (
                <Description>
                  사용 가능 시간: {coupon.availableTime.start} ~{" "}
                  {coupon.availableTime.end}
                </Description>
              )}
            </S.CouponItem>
          );
        })}
      </S.CouponContainer>

      <S.ButtonContainer>
        <S.Button onClick={onClose}>
          총 {totalDiscount.toLocaleString()}원 할인 쿠폰 사용하기
        </S.Button>
      </S.ButtonContainer>
    </Modal>
  );
};

export default CouponModal;
