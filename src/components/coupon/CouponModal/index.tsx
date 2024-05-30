import Button from "@/components/_common/Button";
import { Modal } from "woowacourse-6th-react-modal-component";

import useDiscountCalculator from "@/hooks/coupons/useDiscountCalculator";
import useCouponSelections from "@/hooks/coupons/useCouponSelections";

import NotificationText from "@/components/_common/NotificationText";
import CouponList from "../CouponList";
import { COUPON_SELECTION_RULES } from "@/constants/coupon";

import * as S from "./styled";

interface CouponModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const CouponModal = ({ isModalOpen, closeModal }: CouponModalProps) => {
  const { resetSelectedCoupons } = useCouponSelections();
  const { totalDiscountPrice } = useDiscountCalculator();

  if (!isModalOpen) return null;

  const handleCloseModal = () => {
    resetSelectedCoupons();
    closeModal();
  };

  return (
    <Modal onCloseModal={handleCloseModal} $size="small">
      <S.ModalContent>
        <Modal.Header
          title="쿠폰을 선택해 주세요"
          isCloseIcon={true}
          onCloseModal={handleCloseModal}
        />
        <Modal.Content>
          <NotificationText
            text={`쿠폰은 최대 ${COUPON_SELECTION_RULES.maxSelectCount}개까지 사용할 수 있습니다.`}
          />
          <CouponList />
        </Modal.Content>
        <Modal.Footer>
          <Button
            type="button"
            onClick={closeModal}
            $theme="black"
            $width="100%"
            $height="44px"
          >
            {totalDiscountPrice}원 할인 쿠폰 사용하기
          </Button>
        </Modal.Footer>
      </S.ModalContent>
    </Modal>
  );
};

export default CouponModal;
