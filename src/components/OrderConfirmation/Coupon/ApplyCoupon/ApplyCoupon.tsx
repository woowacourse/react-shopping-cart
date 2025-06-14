import { Modal, useModal } from "@sinjuk1/modal";
import ApplyCouponButton from "../ApplyCouponButton/ApplyCouponButton";
import notice from "/notice.svg";

import * as Styled from "./ApplyCoupon.style";
import CouponList from "../CouponList/CouponList";
import CouponCard from "../CouponCard/CouponCard";
import { Coupon } from "../../../../type/Coupons";
import { CartItem } from "../../../../type/CartItem";
import useSelectedCoupons from "../../../../hooks/orderConfirmation/useCoupons/useSelectedCoupons";
import useAvailableCoupons from "../../../../hooks/orderConfirmation/useCoupons/useAvailableCoupons";
import { calculateCoupons } from "../../../../util/coupons/calculateCoupons";

const COUPON_RULE = {
  maxCoupons: 2,
} as const;

interface ApplyCouponProps {
  coupons: Coupon[];
  selectedCartItems: CartItem[];
  initialSelectedCouponIds: number[];
  isRemoteAreaShipping: boolean;
  handleUseCoupons: (idList: number[]) => void;
}

function ApplyCoupon({
  coupons,
  selectedCartItems,
  initialSelectedCouponIds,
  isRemoteAreaShipping,
  handleUseCoupons,
}: ApplyCouponProps) {
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();

  const {
    selectedCouponIds,
    handleToggleSelectedCouponId,
    handleRollbackSelectedCoupons,
  } = useSelectedCoupons(initialSelectedCouponIds);

  const { availableCouponsIdList } = useAvailableCoupons({
    cartItems: selectedCartItems,
    coupons,
  });

  const { maxDiscountedPrice } = calculateCoupons({
    cartItems: selectedCartItems,
    coupons: coupons.filter((coupon) => selectedCouponIds.includes(coupon.id)),
    hasRemoteAreaShipping: isRemoteAreaShipping,
  });

  const handleRollbackSelectedCouponsWithCloseModal = () => {
    handleRollbackSelectedCoupons();
    handleCloseModal();
  };

  const handleUseCouponsWithCloseModal = () => {
    handleUseCoupons(selectedCouponIds);
    handleCloseModal();
  };

  return (
    <article>
      <ApplyCouponButton onClick={handleOpenModal} />
      <Modal
        isOpen={isOpen}
        onClose={handleRollbackSelectedCouponsWithCloseModal}
      >
        <Modal.Container
          position="center"
          size="small"
          containerStyle={{ maxHeight: "500px" }}
        >
          <Modal.CloseButton />
          <Styled.Title>쿠폰을 선택해 주세요</Styled.Title>
          <Styled.Notice>
            <Styled.NoticeIcon src={notice} />
            <Styled.Text>
              쿠폰은 최대 {COUPON_RULE.maxCoupons}개까지 사용할 수 있습니다.
            </Styled.Text>
          </Styled.Notice>
          <CouponList>
            {coupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                isSelected={selectedCouponIds.includes(coupon.id)}
                isDisabled={
                  !availableCouponsIdList.includes(coupon.id) ||
                  (selectedCouponIds.length === COUPON_RULE.maxCoupons &&
                    !selectedCouponIds.includes(coupon.id))
                }
                handleSelectCoupon={() =>
                  handleToggleSelectedCouponId(coupon.id)
                }
              />
            ))}
          </CouponList>
          <Styled.Button type="button" onClick={handleUseCouponsWithCloseModal}>
            총 {maxDiscountedPrice.toLocaleString()}원 할인 쿠폰 사용하기
          </Styled.Button>
        </Modal.Container>
      </Modal>
    </article>
  );
}

export default ApplyCoupon;
