import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Modal } from "@kaori-killer/modal-component";

import * as CartListStyled from "../ShoppingCart/CartList/CartList.styles";
import * as ItemStyled from "../ShoppingCart/Item/Item.styles";
import WarningBox from "../common/WarningBox/WarningBox";
import Hr from "../common/Hr/Hr";

import useCoupons from "../../hooks/useCoupons";

import { calculateAllCouponCombos } from "../../utils/calculateAllCouponCombos";
import { isCouponValid } from "../../utils/isCouponValid";
import { formatAvailableTime } from "../../utils/formatAvailableTime";

import CartItem from "../../types/CartItem";

import * as Styled from "./CouponModal.styles";
import { formatDate } from "../../utils/formatDate";

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

  const bestCombo = combos
    .filter((combo) => combo.isValid)
    .reduce(
      (max, current) => (current.discount > max.discount ? current : max),
      { discount: 0, combo: [], isValid: false }
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

  const selectedCombos = calculateAllCouponCombos({
    coupons: selectedCouponObjects,
    cartItemList,
    orderAmount,
    isIslandArea,
  });

  const selectedCombo = selectedCombos.find((c) => c.isValid) ?? {
    discount: 0,
    combo: [],
    isValid: false,
  };

  const selectedDiscount = selectedCombo.discount;

  const handleApply = () => {
    handleApplyCouponPrice(selectedDiscount);
    setSelectedCoupons(new Map());
    setIsInitial(true);
    handleClose();
  };

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
            coupons.map((coupon) => {
              const unavailableCoupon = !isCouponValid(coupon, orderAmount);
              const disabled =
                unavailableCoupon ||
                (!selectedCoupons.get(coupon.id) && selectedCoupons.size >= 2);

              return (
                <Styled.CouponContainer key={coupon.id}>
                  <Hr />
                  <CartListStyled.Checkbox>
                    <CartListStyled.Input
                      type="checkbox"
                      id={`coupon-${coupon.id}`}
                      checked={!!selectedCoupons.get(coupon.id)}
                      disabled={disabled}
                      onChange={() => handleCheckboxChange(coupon.id)}
                    />
                    <label htmlFor={`coupon-${coupon.id}`}>
                      {coupon.description}
                    </label>
                  </CartListStyled.Checkbox>
                  <Styled.CouponDescribe>
                    <p>만료일: {formatDate(coupon.expirationDate)}</p>
                    {"minimumAmount" in coupon && (
                      <p>최소 주문 금액: {coupon.minimumAmount}</p>
                    )}
                    {"availableTime" in coupon && (
                      <p>
                        사용 가능 시간:{" "}
                        {formatAvailableTime(
                          coupon.availableTime.start,
                          coupon.availableTime.end
                        )}
                      </p>
                    )}
                    {unavailableCoupon && (
                      <Styled.disabledText>
                        사용 불가: 기간이 지났거나 시간 조건에 맞지 않아요.
                      </Styled.disabledText>
                    )}
                  </Styled.CouponDescribe>
                </Styled.CouponContainer>
              );
            })
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
