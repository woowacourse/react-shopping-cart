import { useRecoilValue } from "recoil";
import { couponsState } from "@/recoil/coupon";
import useCouponSimulator from "@/hooks/useCouponSimulator";

import { Modal } from "harrysimodal";

import Caption from "../_common/Caption/Caption";

import MoreInfo from "@/assets/more-info.svg?react";
import CartItemCoupon from "../CartItemCoupon/CartItemCoupon";

interface CartItemCouponModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const CartItemCouponModal = ({
  isModalOpen,
  closeModal,
}: CartItemCouponModalProps) => {
  const coupons = useRecoilValue(couponsState);

  const {
    checkSelectedCoupon,
    handleAddCoupon,
    handleRemoveCoupon,
    onTemporaryCouponsSubmit,
    discountAmount,
    hasTemporaryCoupons,
  } = useCouponSimulator();

  const onButtonClick = () => {
    onTemporaryCouponsSubmit();
    closeModal();
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} position="center">
      <Modal.ModalContent size="small">
        <Modal.ModalHeader>
          <Modal.ModalTitle text="쿠폰을 선택해 주세요" />
          <Modal.ModalCloseButton onCloseButtonClick={closeModal} />
        </Modal.ModalHeader>

        <Caption
          asset={() => <MoreInfo />}
          text="쿠폰은 최대 2개까지 사용할 수 있습니다."
        />
        {coupons.map((coupon) => (
          <CartItemCoupon
            key={coupon.id}
            coupon={coupon}
            checkSelectedCoupon={checkSelectedCoupon}
            handleAddCoupon={handleAddCoupon}
            handleRemoveCoupon={handleRemoveCoupon}
          />
        ))}

        <Modal.ModalFooter direction="row" justify="between">
          <Modal.ModalButton theme="dark" onClick={onButtonClick}>
            {!hasTemporaryCoupons
              ? "쿠폰 취소하기"
              : `총 ${discountAmount}원 할인 쿠폰 사용하기`}
          </Modal.ModalButton>
        </Modal.ModalFooter>
      </Modal.ModalContent>
    </Modal>
  );
};

export default CartItemCouponModal;
