import { Modal } from "rian-modal-component";
import MoreInfo from "@/components/_common/MoreInfo/MoreInfo";
import { CART_PAGE_MESSAGES } from "@/constants/cart";
import TextBox from "@/components/_common/TextBox/TextBox";
import DeleteButton from "@/assets/delete-icon.svg?react";
import { mockCoupons } from "@/mocks/coupons";
import { Coupon } from "@/types/coupon";
import CouponItem from "./components/Coupon";
import Button from "@/components/_common/Button/Button";
import { theme } from "@/styles/theme";

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
        type="medium"
        text={CART_PAGE_MESSAGES.choiceCoupon}
        style={{ paddingBottom: "20px" }}
      />
      <>
        <MoreInfo text={CART_PAGE_MESSAGES.couponLimit} />
        <Modal.CloseIcon onClick={onCloseModal}>
          <DeleteButton />
        </Modal.CloseIcon>

        {mockCoupons.map((coupon: Coupon) => {
          return (
            <>
              <CouponItem coupon={coupon} key={coupon.id} />
            </>
          );
        })}
        <Button
          onClick={() => {}}
          style={{
            backgroundColor: theme.COLOR["grey-3"],
            color: "white",
            opacity: 100,
            marginTop: "30px",
          }}
          width="full"
          radiusVariant="rounded"
          color="white"
        >
          총 6000원 할인 쿠폰 사용하기
        </Button>
      </>
    </Modal>
  );
};

export default CouponModal;
