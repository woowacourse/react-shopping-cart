import { createPortal } from "react-dom";
import { Modal } from "@kaori-killer/modal-component";
import useCoupons from "../../hooks/useCoupons";
import { useState } from "react";
interface CouponModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

function CouponModal({ isOpen, handleClose }: CouponModalProps) {
  const { coupons } = useCoupons();
  const [selectedCoupons, setSelectedCoupons] = useState<Map<number, boolean>>(
    new Map()
  );

  const handleCheckboxChange = (couponId: number) => {
    setSelectedCoupons((prev) => {
      const newMap = new Map(prev);
      if (newMap.get(couponId)) {
        newMap.delete(couponId);
      } else {
        if (newMap.size < 2) {
          newMap.set(couponId, true);
        }
      }
      return newMap;
    });
  };

  const selectedCouponIds = Array.from(selectedCoupons.keys());

  const totalDiscount = coupons
    .filter((coupon) => selectedCouponIds.includes(coupon.id))
    .reduce((sum, coupon) => sum + (coupon.discountAmount ?? 0), 0);

  return createPortal(
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Modal.Content position="bottom" size="medium">
        <Modal.Header direction="row" align="start" justify="start">
          <Modal.Title tag="h1" fontSize="25px" fontWeight="700">
            쿠폰을 선택해 주세요.
          </Modal.Title>
          <Modal.CloseButton onClose={handleClose} />
        </Modal.Header>

        <Modal.Body>
          <p>쿠폰은 최대 2개까지 사용할 수 있습니다.</p>
          {coupons.length === 0 && <p>사용 가능한 쿠폰이 없습니다.</p>}
          {coupons.map((coupon) => (
            <div key={coupon.id}>
              <input
                type="checkbox"
                id={`coupon-${coupon.id}`}
                checked={!!selectedCoupons.get(coupon.id)}
                disabled={
                  !selectedCoupons.get(coupon.id) && selectedCoupons.size >= 2
                }
                onChange={() => handleCheckboxChange(coupon.id)}
              />
              <label htmlFor={`coupon-${coupon.id}`}>
                {coupon.description}
              </label>
              <p>만료일: {coupon.expirationDate}</p>

              {"minimumAmount" in coupon && (
                <p>최소 사용 금액: {coupon.minimumAmount.toLocaleString()}원</p>
              )}

              {"availableTime" in coupon && (
                <p>
                  사용 가능 시간: {coupon.availableTime.start} ~{" "}
                  {coupon.availableTime.end}
                </p>
              )}
            </div>
          ))}
        </Modal.Body>

        <Modal.Footer direction="column" align="start" justify="center">
          <button disabled={selectedCoupons.size === 0}>
            총 {totalDiscount}원 할인 쿠폰 사용하기
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>,
    document.body
  );
}

export default CouponModal;
