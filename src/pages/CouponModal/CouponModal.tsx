import { Modal } from "rian-modal-component";
import MoreInfo from "@/components/_common/MoreInfo/MoreInfo";
import TextBox from "@/components/_common/TextBox/TextBox";
import DeleteButton from "@/assets/delete-icon.svg?react";
import Button from "@/components/_common/Button/Button";
import { theme } from "@/styles/theme";
import CouponList from "./components/CouponList";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { couponListSelector, discountCouponPriceState } from "@/recoil/coupons";
import useDiscountCalculator from "@/hooks/coupon/useDiscountCalculator";
import {
  finalOrderAmountState,
  totalItemsPriceSelector,
} from "@/recoil/orderInformation";
import { freeShippingCouponSelector } from "@/recoil/shippingFeeType";
import {
  COUPON_ORDER_MESSAGE,
  couponApplyText,
} from "@/constants/couponAndOrder.ts";
import React from "react";
import useCoupons from "@/hooks/coupon/useCoupons";

const CouponModalInner = ({
  isOpen,
  onCloseModal,
}: {
  isOpen: boolean;
  onCloseModal: () => void;
}) => {
  const couponList = useRecoilValue(couponListSelector);
  const totalPrice = useRecoilValue(totalItemsPriceSelector);

  const setFinalOrderAmount = useSetRecoilState(finalOrderAmountState);
  const setDiscountCouponPrice = useSetRecoilState(discountCouponPriceState);

  const { calculateTotalDiscount } = useDiscountCalculator();
  const isFreeShipping = useRecoilValue(freeShippingCouponSelector);
  const { getCouponByType } = useCoupons();
  const totalDiscountAmount = calculateTotalDiscount(
    getCouponByType(),
    totalPrice
  );

  const onApplyCoupon = () => {
    const finalOrderPrice = totalPrice - totalDiscountAmount;
    setFinalOrderAmount(finalOrderPrice);
    setDiscountCouponPrice(totalDiscountAmount);
    onCloseModal();
  };

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
        text={COUPON_ORDER_MESSAGE.choiceCoupon}
        style={{ paddingBottom: "20px" }}
      />
      <>
        <MoreInfo text={COUPON_ORDER_MESSAGE.couponLimit} />
        <Modal.CloseIcon onClick={onCloseModal}>
          <DeleteButton />
        </Modal.CloseIcon>

        <CouponList couponList={couponList} />
        <Button
          onClick={onApplyCoupon}
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
          {couponApplyText(totalDiscountAmount, isFreeShipping)}
        </Button>
      </>
    </Modal>
  );
};

const CouponModal = React.memo(CouponModalInner);

export default CouponModal;
