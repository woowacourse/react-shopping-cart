import * as S from "./CouponModal.styled";
import Text from "../../../../../../components/common/Text";
import CloseSign from "../../../../../../components/icons/CloseSign";
import GuideSign from "../../../../../../components/icons/GuideSign";
import CheckBox from "../../../../../../components/common/CheckBox";
import Button from "../../../../../../components/common/Button";
import CouponSummary from "../../../../utils/CouponSummary";
import { Modal } from "@seo_dev/react-modal";
import { useCouponModal } from "./hooks/useCouponModal";
import { CouponData, OrderCalculationResult, OrderItem } from "../../../../types";

interface orderStateProps {
  isIsolatedAreaSelected: boolean;
  selectedCouponIds: number[];
  orderItems: OrderItem[];
  availableCoupons: CouponData[];
  canSelectMore: boolean;
  toggleCoupon: (couponId: number) => void;
  calculation: OrderCalculationResult;
  onClose: () => void;
}

const CouponModal = ({
  onClose,
  isIsolatedAreaSelected,
  selectedCouponIds,
  orderItems,
  availableCoupons,
  canSelectMore,
  toggleCoupon,
  calculation,
}: orderStateProps) => {
  const { couponStates } = useCouponModal({
    coupons: availableCoupons,
    orderItems: orderItems,
    selectedCouponIds: selectedCouponIds,
    isIsolatedAreaSelected: isIsolatedAreaSelected,
  });
  return (
    <Modal onClose={onClose}>
      <Modal.BackDrop />
      <S.StyledModalContent>
        <S.ModalTop>
          <Modal.Title>
            <Text variant="title-1">쿠폰을 선택해 주세요</Text>
          </Modal.Title>
          <Modal.CloseButton>
            <CloseSign />
          </Modal.CloseButton>
        </S.ModalTop>
        <S.ModalMiddle>
          <S.CouponInfo>
            <GuideSign />
            <Text variant="body-2">쿠폰은 최대 2개까지 사용할 수 있습니다.</Text>
          </S.CouponInfo>
          <S.CouponList>
            {couponStates.map(({ coupon, isSelected, isUsable }) => {
              const { id, description } = coupon;
              const canSelect = canSelectMore || isSelected;
              const finalEnabled = isUsable && canSelect;

              return (
                <S.CouponCard key={id} isUsable={finalEnabled}>
                  <CheckBox isChecked={isSelected} onClick={() => finalEnabled && toggleCoupon(id)}>
                    <Text variant="title-2">{description}</Text>
                  </CheckBox>
                  <CouponSummary coupon={coupon} />
                </S.CouponCard>
              );
            })}
          </S.CouponList>
        </S.ModalMiddle>
        <Button variant="primary" size="full" radius={8} onClick={onClose}>
          {calculation.couponDiscount > 0
            ? `총 ${calculation.couponDiscount.toLocaleString()}원 할인 쿠폰 사용하기`
            : "쿠폰 선택하기"}
        </Button>
      </S.StyledModalContent>
    </Modal>
  );
};

export default CouponModal;
