import { useCoupon } from "../../../domains/coupon/hooks/useCoupon";
import useModal from "../../../features/modal/useModal";
import Description from "../../@common/Description/Description";
import CouponCard from "../CouponCard/CouponCard";
import * as S from "./CouponModal.styles";
import Close from "/close.svg";
import InfoIcon from "/info.svg";

const price = 6000;

const CouponModal = () => {
  const { closeModal } = useModal();
  const { coupons } = useCoupon();

  return (
    <S.CouponModal>
      <S.HeaderContainer>
        <S.Title>쿠폰을 선택해 주세요</S.Title>
        <S.CloseButton src={Close} alt="close-modal" onClick={closeModal} />
      </S.HeaderContainer>
      <S.InfoContainer>
        <img src={InfoIcon} alt="info" />
        <Description>쿠폰은 최대 2개까지 사용할 수 있습니다.</Description>
      </S.InfoContainer>
      <S.CouponItemsContainer>
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} />
        ))}
      </S.CouponItemsContainer>
      <S.ApplyCouponButton onClick={() => closeModal()}>
        총 {price.toLocaleString()}원 할인 쿠폰 사용하기
      </S.ApplyCouponButton>
    </S.CouponModal>
  );
};

export default CouponModal;
