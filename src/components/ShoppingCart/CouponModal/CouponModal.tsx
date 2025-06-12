import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Modal } from "@kaori-killer/modal-component";

import CouponItem from "../CouponItem/CouponItem";
import * as ItemStyled from "../Item/Item.styles";
import WarningBox from "../../common/WarningBox/WarningBox";

import useCoupons from "../../../hooks/useCoupons";
import useSelectedCoupons from "../../../hooks/useSelectedCoupons";

import { calculateAllCouponCombos } from "../../../utils/calculateAllCouponCombos";
import { getSelectedCouponDiscount } from "../../../utils/getSelectedCouponObjects";

import CartItem from "../../../types/CartItem";
import { Combo } from "../../../types/Combo";

function getBestCombo(combos: Combo[]) {
  return combos
    .filter((combo) => combo.isValid)
    .reduce(
      (max, current) => (current.discount > max.discount ? current : max),
      { discount: 0, combo: [], isValid: false }
    );
}

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
  const hasInitializedRef = useRef(false);

  const { coupons } = useCoupons();
  const {
    selectedCoupons,
    initializeSelectedCoupons,
    toggleCoupon,
    resetCoupons,
    isSelected,
  } = useSelectedCoupons();

  const combos = calculateAllCouponCombos({
    coupons,
    cartItemList,
    orderAmount,
    isIslandArea,
  });

  const bestCombo = getBestCombo(combos);

  useEffect(() => {
    if (bestCombo.combo.length === 0 || selectedCoupons.size > 0) return;
    if (hasInitializedRef.current) return;

    const initialMap = new Map<number, boolean>();
    bestCombo.combo.forEach((code) => {
      const match = coupons.find((c) => c.code === code);
      if (match) initialMap.set(match.id, true);
    });

    initializeSelectedCoupons(initialMap);
    hasInitializedRef.current = true;
  }, [
    bestCombo.combo,
    coupons,
    initializeSelectedCoupons,
    selectedCoupons.size,
  ]);

  const selectedDiscount = getSelectedCouponDiscount({
    coupons,
    selectedCoupons,
    cartItemList,
    orderAmount,
    isIslandArea,
  });

  const handleApply = () => {
    handleApplyCouponPrice(selectedDiscount);
    resetCoupons();
    handleClose();
  };

  console.log(selectedCoupons);

  return createPortal(
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Modal.Content position="center" size="small">
        <Modal.Header direction="row" align="start" justify="start">
          <Modal.Title tag="h1" fontSize="25px" fontWeight="700">
            쿠폰을 선택해 주세요.
          </Modal.Title>
          <Modal.CloseButton onClose={handleClose} />
        </Modal.Header>

        <Modal.Body>
          <WarningBox text="쿠폰은 최대 2개까지 사용할 수 있습니다." />

          {coupons.length === 0 ? (
            <p>사용 가능한 쿠폰이 없습니다.</p>
          ) : (
            coupons.map((coupon) => (
              <CouponItem
                key={coupon.id}
                coupon={coupon}
                orderAmount={orderAmount}
                isSelected={isSelected(coupon.id)}
                selectedCouponsSize={selectedCoupons.size}
                onToggle={() => toggleCoupon(coupon.id)}
              />
            ))
          )}
        </Modal.Body>

        <Modal.Footer direction="column" align="start" justify="center">
          <ItemStyled.Button
            width="287"
            height="44"
            onClick={handleApply}
            variant="dark"
          >
            총 {selectedDiscount.toLocaleString()}원 할인 쿠폰 사용하기
          </ItemStyled.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>,
    document.body
  );
}

export default CouponModal;
