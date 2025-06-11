/** @jsxImportSource @emotion/react */

import * as S from './CouponList.styles';
import Button from '../../../shared/ui/Button';
import useCouponSelection from '../hooks/useCouponSelection';
import { useCartContext } from '../../../shared/context/useCartContext';
import CouponItem from './CouponItem';

interface CouponListProps {
  onClose: () => void;
}

export default function CouponList({ onClose }: CouponListProps) {
  const { selectedCoupons, deliveryFee, totalPrice, totalDiscountPrice } = useCartContext();
  const {
    coupons,
    getBestTwoCoupons,
    highestPriceCartItem,
    invalidCouponIds,
    isCouponLoading,
    couponError,
    handleCouponSelection,
  } = useCouponSelection();

  return (
    <S.CouponListContainer>
      <S.CouponListHeader>
        쿠폰을 선택해주세요.
        <Button onClick={() => onClose()} title='X' css={S.CloseButtonCSS} />
      </S.CouponListHeader>

      <S.CouponLabel>
        <S.CouponIcon src='./infoLabelIcon.svg' alt='Coupon Label Icon' />
        쿠폰은 최대 2개까지 사용할 수 있습니다.
      </S.CouponLabel>
      <S.CouponListContent>
        {couponError && <span>쿠폰 목록을 불러오는 데 실패했습니다.</span>}
        {isCouponLoading ? (
          <span>쿠폰 목록 불러오는 중...</span>
        ) : (
          coupons.map((coupon) => (
            <CouponItem
              key={coupon.id}
              coupon={coupon}
              selectedCoupons={selectedCoupons}
              invalidCouponIds={invalidCouponIds}
              highestPriceCartItem={highestPriceCartItem}
              totalPrice={totalPrice}
              deliveryFee={deliveryFee}
              handleCouponSelection={handleCouponSelection}
              getBestTwoCoupons={getBestTwoCoupons}
            />
          ))
        )}
      </S.CouponListContent>
      <S.CouponListFooterContainer>
        <S.UseCouponButton onClick={() => onClose()} disabled={selectedCoupons.length === 0} css={S.CouponButtonCSS}>
          총 {totalDiscountPrice.toLocaleString()}원 할인 쿠폰 사용하기
        </S.UseCouponButton>
      </S.CouponListFooterContainer>
    </S.CouponListContainer>
  );
}
