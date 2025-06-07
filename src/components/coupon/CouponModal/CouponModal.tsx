import { MAX_COUPON_SELECTION } from "../../../domains/coupon/constants";
import { useCoupon } from "../../../domains/coupon/hooks/useCoupon";
import useCouponValidation from "../../../domains/coupon/hooks/useCouponValidation";
import useModal from "../../../features/modal/useModal";
import { formatCurrency } from "../../../utils/formatters";
import Description from "../../@common/Description/Description";
import CouponCard from "../CouponCard/CouponCard";
import * as S from "./CouponModal.styles";
import Close from "/close.svg";
import InfoIcon from "/info.svg";

// TODO: 실제로 쿠폰 적용에 따른 계산된 값 불러오기
const price = 6000;

const CouponModal = () => {
  const { closeModal } = useModal();
  const { validateCoupon } = useCouponValidation();
  const {
    coupons,
    toggleCouponSelection,
    isCouponSelected,
    hasNoSelectedCoupons,
  } = useCoupon();

  return (
    <S.CouponModal>
      <S.HeaderContainer>
        <S.Title>쿠폰을 선택해 주세요</S.Title>
        <S.CloseButton src={Close} alt="close-modal" onClick={closeModal} />
      </S.HeaderContainer>
      <S.InfoContainer>
        <img src={InfoIcon} alt="info" />
        <Description>
          쿠폰은 최대 {MAX_COUPON_SELECTION}개까지 사용할 수 있습니다.
        </Description>
      </S.InfoContainer>
      <S.CouponItemsContainer>
        {coupons.map((coupon) => (
          <CouponCard
            key={coupon.id}
            coupon={coupon}
            enable={validateCoupon(coupon)}
            selected={isCouponSelected(coupon.id)}
            onToggle={toggleCouponSelection}
          />
        ))}
      </S.CouponItemsContainer>
      <S.ApplyCouponButton
        onClick={() => closeModal()}
        disabled={hasNoSelectedCoupons}
      >
        총 {formatCurrency(price)} 할인 쿠폰 사용하기
      </S.ApplyCouponButton>
    </S.CouponModal>
  );
};

export default CouponModal;
