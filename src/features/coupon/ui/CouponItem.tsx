/** @jsxImportSource @emotion/react */
import * as S from './CouponList.styles';
import SelectInput from '../../../shared/ui/SelectInput';
import { Coupon } from '../types/coupon';
import { CartItem } from '../../cart/api/types/cart';

interface CouponItemProps {
  coupon: Coupon;
  selectedCoupons: Coupon[];
  invalidCouponIds: number[];
  highestPriceCartItem: CartItem;
  totalPrice: number;
  deliveryFee: number;
  handleCouponSelection: (coupon: Coupon) => void;
  getBestTwoCoupons: (
    highestPriceCartItem: CartItem,
    totalPrice: number,
    deliveryFee: number
  ) => {
    coupons: { coupon: Coupon; discountPrice: number }[];
    message: string;
  };
}

export default function CouponItem({
  coupon,
  selectedCoupons,
  invalidCouponIds,
  handleCouponSelection,
  highestPriceCartItem,
  totalPrice,
  deliveryFee,
  getBestTwoCoupons,
}: CouponItemProps) {
  return (
    <S.CouponContainer key={coupon.id} isInvalid={invalidCouponIds.includes(coupon.id)}>
      <S.CouponHeader>
        <SelectInput
          type='checkbox'
          onChange={() => handleCouponSelection(coupon)}
          checked={selectedCoupons.some((selectedCoupon: Coupon) => selectedCoupon.id === coupon.id)}
          disabled={
            invalidCouponIds.includes(coupon.id) ||
            (coupon.discountType === 'buyXgetY' &&
              getBestTwoCoupons(highestPriceCartItem, totalPrice, deliveryFee).message !== '')
          }
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
        <S.bestTwoCouponMessage>
          {getBestTwoCoupons(highestPriceCartItem, totalPrice, deliveryFee).coupons.map(
            (bestCoupon) => bestCoupon.coupon.discountType === coupon.discountType && '추천 Pick 쿠폰!'
          )}
        </S.bestTwoCouponMessage>
        <S.messageContainer>
          {coupon.discountType === 'buyXgetY' &&
            getBestTwoCoupons(highestPriceCartItem, totalPrice, deliveryFee).message}
        </S.messageContainer>
      </S.CouponInfo>
    </S.CouponContainer>
  );
}
