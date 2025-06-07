import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Modal } from "@kaori-killer/modal-component";

import useCoupons from "../../hooks/useCoupons";
import { calculateAllCouponCombos } from "../../utils/calculateAllCouponCombos";

import CartItem from "../../types/CartItem";

interface CouponModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleApplyCouponPrice: (totalDiscount: number) => void;
  cartItemList: CartItem[];
  orderAmount: number;
  isIslandArea: boolean;
}

function CouponModal({
  isOpen,
  handleClose,
  handleApplyCouponPrice,
  cartItemList,
  orderAmount,
  isIslandArea,
}: CouponModalProps) {
  const { coupons } = useCoupons();
  const [selectedCoupons, setSelectedCoupons] = useState<Map<number, boolean>>(
    new Map()
  );
  const [isInitial, setIsInitial] = useState(true);

  const combos = calculateAllCouponCombos({
    coupons,
    cartItemList,
    orderAmount,
    isIslandArea,
  });

  const bestCombo = combos.reduce(
    (max, current) => (current.discount > max.discount ? current : max),
    { discount: 0, combo: [] as string[] }
  );

  useEffect(() => {
    if (isInitial && bestCombo.combo.length > 0) {
      const initialMap = new Map<number, boolean>();
      bestCombo.combo.forEach((code) => {
        const match = coupons.find((c) => c.code === code);
        if (match) initialMap.set(match.id, true);
      });
      setSelectedCoupons(initialMap);
      setIsInitial(false);
    }
  }, [coupons, bestCombo, isInitial]);

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

  const selectedCouponObjects = coupons.filter((c) =>
    selectedCoupons.has(c.id)
  );

  const selectedCombo = calculateAllCouponCombos({
    coupons: selectedCouponObjects,
    cartItemList,
    orderAmount,
    isIslandArea,
  })[0];

  const selectedDiscount = selectedCombo?.discount ?? 0;

  const handleApply = () => {
    handleApplyCouponPrice(selectedDiscount);
    setSelectedCoupons(new Map());
    setIsInitial(true);
    handleClose();
  };

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
          {coupons.length === 0 ? (
            <p>사용 가능한 쿠폰이 없습니다.</p>
          ) : (
            coupons.map((coupon) => (
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
              </div>
            ))
          )}
        </Modal.Body>

        <Modal.Footer direction="column" align="start" justify="center">
          <button disabled={selectedCoupons.size === 0} onClick={handleApply}>
            총 {selectedDiscount.toLocaleString()}원 할인 쿠폰 사용하기
          </button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>,
    document.body
  );
}

export default CouponModal;
