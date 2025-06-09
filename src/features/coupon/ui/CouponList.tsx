/** @jsxImportSource @emotion/react */

import { useEffect } from 'react';
import * as S from './CouponList.styles';
import { Coupon } from '../types/coupon';
import SelectInput from '../../../shared/ui/SelectInput';
import Button from '../../../shared/ui/Button';
import { css } from '@emotion/react';
import { useCartContext } from '../../../shared/context/useCartContext';
import { getSelectedCartItemsFromLocalStorage } from '../../cart/utils/localStorageService';
import { calculateTotalDiscountPrice } from '../utils/calculateTotalDiscountPrice';
import useCoupons from '../hooks/useCoupons';

const CloseButtonCSS = css`
  width: 20px;
  height: 20px;
  font-size: 16px;
  border-radius: 3px;

  transition: background-color 0.2s ease;
  padding: 1px;

  &:hover {
    background-color: #e0e0e0;
  }

  &:disabled {
    background-color: #bebebe;
    cursor: not-allowed;
  }
`;

const CouponButtonCSS = css`
  width: 100%;
  height: 100%;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #333;
  }

  &:disabled {
    background-color: #bebebe;
    cursor: not-allowed;
  }
`;

interface CouponListProps {
  onClose: () => void;
}

export default function CouponList({ onClose }: CouponListProps) {
  const {
    selectedCoupons,
    updateSelectedCoupons,
    totalDiscountPrice,
    deliveryFee,
    updateTotalDiscountPrice,
    updateTotalPurchasePrice,
  } = useCartContext();
  const { coupons, getInvalidCouponIds, getBestTwoCoupons, isCouponLoading, message } = useCoupons();

  const selectedCartItems = getSelectedCartItemsFromLocalStorage();

  const totalPrice = selectedCartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const highestPrice = Math.max(...selectedCartItems.map((i) => i.product.price));
  const highestPriceCartItem = selectedCartItems.filter((item) => item.product.price === highestPrice)[0];

  const invalidCouponIds = getInvalidCouponIds(totalPrice);

  useEffect(() => {
    if (coupons.length === 0) return;

    const bestTwo = getBestTwoCoupons(highestPriceCartItem, totalPrice, deliveryFee);
    const totalDiscountPrice = bestTwo.reduce((acc, bestCoupon) => acc + bestCoupon.discountPrice, 0);

    updateTotalDiscountPrice(totalDiscountPrice);
    updateSelectedCoupons(bestTwo.map((bestCoupon) => bestCoupon.coupon));

    updateTotalPurchasePrice(totalPrice + deliveryFee - totalDiscountPrice);
  }, [coupons, deliveryFee]);

  useEffect(() => {
    updateTotalDiscountPrice(
      calculateTotalDiscountPrice({
        selectedCoupons,
        highestPriceCartItem,
        totalPrice,
        deliveryFee,
      })
    );
  }, [selectedCoupons]);

  const handleCloseModal = () => {
    onClose();
  };

  const handleCouponSelection = (selectedCoupon: Coupon) => {
    if (selectedCoupons.length >= 2 && !selectedCoupons.some((coupon) => coupon.id === selectedCoupon.id)) {
      alert('최대 2개의 쿠폰만 선택할 수 있습니다.');
      return;
    }

    const existingCoupon = selectedCoupons.some((coupon) => coupon.id === selectedCoupon.id);
    if (existingCoupon) {
      updateSelectedCoupons(selectedCoupons.filter((coupon) => coupon.id !== selectedCoupon.id));
      return;
    }

    if (selectedCoupons.length <= 1) {
      const updatedCoupons = [...selectedCoupons, selectedCoupon];
      updateSelectedCoupons(updatedCoupons);
    }
  };

  const handleCouponUsage = () => {
    onClose();
  };

  return (
    <S.CouponListContainer>
      <S.CouponListHeader>
        쿠폰을 선택해주세요.
        <Button onClick={handleCloseModal} title='X' css={CloseButtonCSS} />
      </S.CouponListHeader>

      <S.CouponLabel>
        <S.CouponIcon src='./infoLabelIcon.svg' alt='Coupon Label Icon' />
        쿠폰은 최대 2개까지 사용할 수 있습니다.
      </S.CouponLabel>
      <S.CouponListContent>
        {isCouponLoading ? (
          <span>쿠폰 목록 불러오는 중...</span>
        ) : (
          coupons.map((coupon) => (
            <S.CouponContainer key={coupon.id} isInvalid={invalidCouponIds.includes(coupon.id)}>
              <S.CouponHeader>
                <SelectInput
                  type='checkbox'
                  onChange={() => handleCouponSelection(coupon)}
                  checked={selectedCoupons.some((selectedCoupon) => selectedCoupon.id === coupon.id)}
                  disabled={invalidCouponIds.includes(coupon.id)}
                />
                {coupon.description}
              </S.CouponHeader>
              <S.CouponInfo>
                <span>만료일: {coupon.expirationDate}</span>
                {coupon.minimumAmount && <span>최소 주문 금액: {coupon.minimumAmount.toLocaleString()}</span>}
                {coupon.availableTime && (
                  <span>
                    사용 가능 시간: 오전 {coupon.availableTime.start[1]}시부터 {coupon.availableTime.end[1]}까지
                  </span>
                )}
                {message.length !== 0 && coupon.discountType === 'buyXgetY' && (
                  <S.messageContainer> {message} </S.messageContainer>
                )}
              </S.CouponInfo>
            </S.CouponContainer>
          ))
        )}
      </S.CouponListContent>
      <S.CouponListFooterContainer>
        <S.UseCouponButton onClick={handleCouponUsage} disabled={selectedCoupons.length === 0} css={CouponButtonCSS}>
          총 {totalDiscountPrice.toLocaleString()}원 할인 쿠폰 사용하기
        </S.UseCouponButton>
      </S.CouponListFooterContainer>
    </S.CouponListContainer>
  );
}
