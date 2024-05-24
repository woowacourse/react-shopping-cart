import { Modal } from "rian-modal-component";
import MoreInfo from "@/components/_common/MoreInfo/MoreInfo";
import { CART_PAGE_MESSAGES } from "@/constants/cart";
import TextBox from "@/components/_common/TextBox/TextBox";
import DeleteButton from "@/assets/delete-icon.svg?react";
import { Coupon } from "@/types/coupon";
import CouponItem from "./components/Coupon";
import Button from "@/components/_common/Button/Button";
import { theme } from "@/styles/theme";
import { useRecoilValue } from "recoil";
import { couponListSelector } from "@/recoil/coupons";
import useCouponApplicabilityChecker from "@/hooks/useCouponApplicabilityChecker";
import { totalOrderPriceSelector } from "@/recoil/orderInformation";

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

  const applicableCoupons: Coupon[] = [];
  const nonApplicableCoupons: Coupon[] = [];

  couponList.forEach((coupon) => {
    if (
      isCouponApplicable({
        coupon: coupon,
        price: totalItemsPrice,
        time: new Date(),
      })
    ) {
      applicableCoupons.push(coupon);
    } else {
      nonApplicableCoupons.push(coupon);
    }
  });

  const sortedCoupons = [...applicableCoupons, ...nonApplicableCoupons];

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

        {sortedCoupons.map((coupon: Coupon) => {
          return (
            <>
              <CouponItem
                coupon={coupon}
                key={coupon.id}
                disabled={
                  !isCouponApplicable({
                    coupon: coupon,
                    price: totalItemsPrice,
                    time: new Date(),
                  })
                }
              />
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
