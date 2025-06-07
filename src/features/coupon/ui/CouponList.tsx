/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import * as S from './CouponList.styles';
import { getCoupons } from '../api/getCoupons';
import { Coupon } from '../types/coupon';
import SelectInput from '../../../shared/ui/SelectInput';
import Button from '../../../shared/ui/Button';
import { css } from '@emotion/react';
import { useCartContext } from '../../../shared/context/useCartContext';

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
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const { selectedCoupons, updateSelectedCoupons } = useCartContext();

  console.log('선택된 쿠폰 목록', selectedCoupons);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await getCoupons();
        setCoupons(response);
      } catch (error) {
        if (error instanceof Error) {
          console.error('쿠폰 목록을 가져오는 중 오류 발생:', error.message);
        }
      }
    };

    fetchCoupons();
  }, []);

  const handleCloseModal = () => {
    onClose();
  };

  const handleCouponSelection = (selectedCoupon: Coupon) => {
    if (selectedCoupons.length >= 2 && !selectedCoupons.some((coupon) => coupon.id === selectedCoupon.id)) {
      alert('최대 2개의 쿠폰만 선택할 수 있습니다.');
      return;
    }

    updateSelectedCoupons(selectedCoupon);
  };

  const handleCouponUsage = () => {
    onClose();
  };

  console.log('쿠폰 목록:', coupons);

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
        {coupons.map((coupon) => (
          <S.CouponContainer key={coupon.id}>
            <S.CouponHeader>
              <SelectInput
                type='checkbox'
                onChange={() => handleCouponSelection(coupon)}
                checked={selectedCoupons.some((selectedCoupon) => selectedCoupon.id === coupon.id)}
              />
              {coupon.description}
            </S.CouponHeader>
            <S.CouponInfo>
              <span>만료일: {coupon.expirationDate}</span>
              {coupon.minimumAmount && <span>최소 주문 금액: {coupon.minimumAmount.toLocaleString()}</span>}
            </S.CouponInfo>
          </S.CouponContainer>
        ))}
      </S.CouponListContent>
      <S.CouponListFooterContainer>
        <S.UseCouponButton onClick={handleCouponUsage} disabled={selectedCoupons.length === 0} css={CouponButtonCSS}>
          할인 쿠폰 사용하기
        </S.UseCouponButton>
      </S.CouponListFooterContainer>
    </S.CouponListContainer>
  );
}
