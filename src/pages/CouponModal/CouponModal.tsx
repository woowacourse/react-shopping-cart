import { Modal } from "rian-modal-component";
import MoreInfo from "@/components/_common/MoreInfo/MoreInfo";
import { CART_PAGE_MESSAGES } from "@/constants/cart";
import TextBox from "@/components/_common/TextBox/TextBox";
import DeleteButton from "@/assets/delete-icon.svg?react";
import { Coupon } from "@/types/coupon";
import Button from "@/components/_common/Button/Button";
import { theme } from "@/styles/theme";
import { useRecoilValue } from "recoil";
import { couponListSelector } from "@/recoil/coupons";
import useCouponApplicabilityChecker from "@/hooks/coupon/useCouponApplicabilityChecker";
import { totalOrderPriceSelector } from "@/recoil/orderInformation";
import CouponList from "./components/CouponList";

export type CouponWithApplicablity = { coupon: Coupon; applicability: boolean };

const CouponModal = ({
  isOpen,
  onCloseModal,
}: {
  isOpen: boolean;
  onCloseModal: () => void;
}) => {
  const couponList = useRecoilValue(couponListSelector);
  const totalItemsPrice = useRecoilValue(totalOrderPriceSelector);
  const { isCouponApplicable } = useCouponApplicabilityChecker();

  const applicableCoupons: CouponWithApplicablity[] = [];
  const nonApplicableCoupons: CouponWithApplicablity[] = [];

  couponList.forEach((coupon) => {
    if (
      isCouponApplicable({
        coupon: coupon,
        price: totalItemsPrice,
        time: new Date(),
      })
    ) {
      applicableCoupons.push({ coupon: coupon, applicability: true });
    } else {
      nonApplicableCoupons.push({ coupon: coupon, applicability: false });
    }
  });

  const sortedCouponsWithApplicability = [
    ...applicableCoupons,
    ...nonApplicableCoupons,
  ];

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

        <CouponList couponsWithApplicability={sortedCouponsWithApplicability} />
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
