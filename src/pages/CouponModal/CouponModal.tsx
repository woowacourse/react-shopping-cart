import { Modal } from "rian-modal-component";
import MoreInfo from "@/components/_common/MoreInfo/MoreInfo";
import { CART_PAGE_MESSAGES, SHIPPING_FEE } from "@/constants/cart";
import TextBox from "@/components/_common/TextBox/TextBox";
import DeleteButton from "@/assets/delete-icon.svg?react";
import Button from "@/components/_common/Button/Button";
import { theme } from "@/styles/theme";
import CouponList from "./components/CouponList";
import { useRecoilValue } from "recoil";
import { couponListSelector, couponsState } from "@/recoil/coupons";
import useDiscountCalculator from "@/hooks/coupon/useDiscountCalculator";
import { totalOrderPriceSelector } from "@/recoil/orderInformation";
import { shippingFeeState } from "@/recoil/shippingFeeType";

const CouponModal = ({
  isOpen,
  onCloseModal,
}: {
  isOpen: boolean;
  onCloseModal: () => void;
}) => {
  const couponList = useRecoilValue(couponListSelector);
  const totalPrice = useRecoilValue(totalOrderPriceSelector);
  const coupons = useRecoilValue(couponsState);
  const shippingFeeType = useRecoilValue(shippingFeeState);

  const { calculateTotalDiscount } = useDiscountCalculator();

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

        <CouponList couponList={couponList} />
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
          {`총 ${
            calculateTotalDiscount(
              coupons,
              totalPrice,
              SHIPPING_FEE[shippingFeeType]
            ) || 0
          }원 할인 쿠폰 사용하기`}
        </Button>
      </>
    </Modal>
  );
};

export default CouponModal;
