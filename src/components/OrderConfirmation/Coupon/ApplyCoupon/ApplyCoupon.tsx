import { Modal, useModal } from "@sinjuk1/modal";
import ApplyCouponButton from "../ApplyCouponButton/ApplyCouponButton";
import notice from "/notice.svg";

import * as Styled from "./ApplyCoupon.style";
import CouponList from "../CouponList/CouponList";
import CouponCard from "../CouponCard/CouponCard";
import { Coupon } from "../../../../type/Coupons";
import { CartItem } from "../../../../type/CartItem";
import { calculateTotalPrice } from "../../../../util/cart/calculateTotalPrice";
import useSelectedCoupons from "../../../../hooks/useCoupons/useSelectedCoupons";

const COUPON_RULE = {
  maxCoupons: 2,
} as const;

interface ApplyCouponProps {
  coupons: Coupon[];
  selectedCartItems: CartItem[];
  initialSelectedCouponIds: number[];
  handleUseCoupons: (idList: number[]) => void;
}

function ApplyCoupon({
  coupons,
  selectedCartItems,
  initialSelectedCouponIds,
  handleUseCoupons,
}: ApplyCouponProps) {
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const totalPrice = calculateTotalPrice(selectedCartItems);

  const totalPriceWithCoupons = totalPrice;

  const {
    selectedCouponIds,
    handleToggleSelectedCouponId,
    handleRollbackSelectedCoupons,
  } = useSelectedCoupons(initialSelectedCouponIds);

  return (
    <article>
      <ApplyCouponButton onClick={handleOpenModal} />
      <Modal
        isOpen={isOpen}
        onClose={() => {
          handleRollbackSelectedCoupons();
          handleCloseModal();
        }}
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
                  selectedCouponIds.length === COUPON_RULE.maxCoupons &&
                  !selectedCouponIds.includes(coupon.id)
                }
                handleSelectCoupon={() =>
                  handleToggleSelectedCouponId(coupon.id)
                }
              />
            ))}
          </CouponList>
          <Styled.Button
            type="button"
            onClick={() => {
              handleUseCoupons(selectedCouponIds);
              handleCloseModal();
            }}
          >
            총 {totalPriceWithCoupons.toLocaleString()}원 할인 쿠폰 사용하기
          </Styled.Button>
        </Modal.Container>
      </Modal>
    </article>
  );
}

export default ApplyCoupon;
