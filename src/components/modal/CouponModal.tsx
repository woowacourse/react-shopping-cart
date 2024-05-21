import { Modal } from "rian-modal-component";
import MoreInfo from "../_common/MoreInfo/MoreInfo";
import { CART_PAGE_MESSAGES } from "@/constants/cart";
import TextBox from "../_common/TextBox/TextBox";
import * as S from "./CouponModal.style";
import DeleteButton from "@/assets/delete-icon.svg?react";

const CouponModal = ({
  isOpen,
  onCloseModal,
}: {
  isOpen: boolean;
  onCloseModal: () => void;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      position="center"
      onClose={onCloseModal}
      size="medium"
      contentPosition="center"
    >
      <TextBox
        type="title"
        text={CART_PAGE_MESSAGES.choiceCoupon}
        style={{ paddingBottom: "20px" }}
      />
      <S.Wrapper>
        <MoreInfo text={CART_PAGE_MESSAGES.couponLimit} />
        <Modal.CloseIcon onClick={onCloseModal}>
          <DeleteButton />
        </Modal.CloseIcon>
      </S.Wrapper>
    </Modal>
  );
};

export default CouponModal;
