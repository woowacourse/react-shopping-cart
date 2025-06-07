import { Modal, useModal } from "@sinjuk1/modal";
import ApplyCouponButton from "../ApplyCouponButton/ApplyCouponButton";
import notice from "/notice.svg";

import * as Styled from "./ApplyCoupon.style";
import CouponList from "../CouponList/CouponList";
import CouponCard from "../CouponCard/CouponCard";
import { Coupon } from "../../../../type/Coupons";
import { CartItem } from "../../../../type/CartItem";
import { calculateTotalPrice } from "../../../../util/cart/calculateTotalPrice";

const COUPON_RULE = {
  maxCoupons: 2,
} as const;

interface ApplyCouponProps {
  coupons: Coupon[];
  selectedCartItems: CartItem[];
  handleUseCoupons: () => void;
}

function ApplyCoupon({
  coupons,
  selectedCartItems,
  handleUseCoupons,
}: ApplyCouponProps) {
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  const totalPrice = calculateTotalPrice(selectedCartItems);

  const totalPriceWithCoupons = totalPrice;

  return (
    <article>
      <ApplyCouponButton onClick={handleOpenModal} />
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
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
                isSelected={true}
                handleSelectCoupon={() => {}}
              />
            ))}
          </CouponList>
          <Styled.Button type="button" onClick={handleUseCoupons}>
            총 {totalPriceWithCoupons.toLocaleString()}원 할인 쿠폰 사용하기
          </Styled.Button>
        </Modal.Container>
      </Modal>
    </article>
  );
}

export default ApplyCoupon;
