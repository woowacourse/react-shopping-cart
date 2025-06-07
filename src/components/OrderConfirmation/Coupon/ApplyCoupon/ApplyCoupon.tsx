import { Modal, useModal } from "@sinjuk1/modal";
import ApplyCouponButton from "../ApplyCouponButton/ApplyCouponButton";
import notice from "/notice.svg";

import * as Styled from "./ApplyCoupon.style";
import CouponList from "../CouponList/CouponList";
import CouponCard from "../CouponCard/CouponCard";
import { Coupon } from "../../../../type/Coupons";

const coupons: Coupon[] = [
  {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2025-11-30",
    discount: 5000,
    minimumAmount: 100000,
    discountType: "fixed",
  },
  {
    id: 2,
    code: "BOGO",
    description: "2개 구매 시 1개 무료 쿠폰",
    expirationDate: "2025-06-30",
    buyQuantity: 2,
    getQuantity: 1,
    discountType: "buyXgetY",
  },
  {
    id: 3,
    code: "FREESHIPPING",
    description: "5만원 이상 구매 시 무료 배송 쿠폰",
    expirationDate: "2025-08-31",
    minimumAmount: 50000,
    discountType: "freeShipping",
  },
  {
    id: 4,
    code: "MIRACLESALE",
    description: "미라클모닝 30% 할인 쿠폰",
    expirationDate: "2025-07-31",
    discount: 30,
    availableTime: {
      start: "04:00:00",
      end: "07:00:00",
    },
    discountType: "percentage",
  },
];

const COUPON_RULE = {
  maxCoupons: 2,
} as const;

function ApplyCoupon() {
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();

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
        </Modal.Container>
      </Modal>
    </article>
  );
}

export default ApplyCoupon;
