/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import * as S from './CouponList.styles';
import { getCoupons } from '../api/getCoupons';
import { Coupon } from '../types/coupon';
import SelectInput from '../../../shared/ui/SelectInput';
import Button from '../../../shared/ui/Button';
import { css } from '@emotion/react';

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
`;

interface CouponListProps {
  onClose: () => void;
}

export default function CouponList({ onClose }: CouponListProps) {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

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
              <SelectInput type='checkbox' />
              {coupon.description}
            </S.CouponHeader>
            <S.CouponInfo>
              <span>만료일: {coupon.expirationDate}</span>
              {coupon.minimumAmount && <span>최소 주문 금액: {coupon.expirationDate}</span>}
            </S.CouponInfo>
          </S.CouponContainer>
        ))}
      </S.CouponListContent>
      <S.CouponListFooterContainer>
        <S.UseCouponButton>할인 쿠폰 사용하기</S.UseCouponButton>
      </S.CouponListFooterContainer>
    </S.CouponListContainer>
  );
}
