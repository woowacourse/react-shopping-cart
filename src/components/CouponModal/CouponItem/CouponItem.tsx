import { COUPON } from '../../../constants/constants';
import Checkbox from '../../Checkbox/Checkbox';
import { Coupon } from '../../../api/get/getCoupons';
import useCouponApplier from '../../../hooks/coupons/useCouponApplier';
import useCouponParser from '../../../hooks/coupons/useCouponParser';
import { selectedCoupons } from '../../../recoil/atoms';
import { priceInfoStore } from './../../../recoil/selectors';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import * as S from './styled';

export interface CouponItem {
  coupon: Coupon;
}

const CouponItem = ({ coupon }: CouponItem) => {
  const [isUsable, setIsUsable] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const [selected, setSelected] = useRecoilState(selectedCoupons);
  const priceInfo = useRecoilValue(priceInfoStore);
  const couponDetail = useCouponParser(coupon);
  const { isCouponUsable } = useCouponApplier();

  useEffect(() => {
    const newIsUsable = isCouponUsable(coupon, priceInfo.order);
    setIsUsable(newIsUsable);
  }, [priceInfo, coupon]);

  const toggleCouponCheckbox = () => {
    // NOTE: 선택된 쿠폰 리스트에서 현재 쿠폰의 존재 여부 확인
    const isSelected = selected.find(item => item.id === coupon.id);
    if (isSelected) {
      setSelected(selected.filter(item => item.id !== coupon.id));
    } else {
      setSelected([...selected, coupon]);
    }
  };

  useEffect(() => {
    const currentIsSelected = selected.some(item => item.id === coupon.id);
    setIsSelected(currentIsSelected);
  }, [selected, coupon.id]);

  // NOTE: 선택된 쿠폰의 수에 따라 isUsable 업데이트
  useEffect(() => {
    if (selected.length >= COUPON.MAX_APPLICABLE_COUNT) {
      // 현재 쿠폰이 선택된 쿠폰 목록에 없다면 isUsable을 false로 설정
      setIsUsable(selected.some(item => item.id === coupon.id));
    } else {
      // 선택된 쿠폰이 2개 미만일 때는 isCouponUsable 함수 호출
      const newIsUsable = isCouponUsable(coupon, priceInfo.order);
      setIsUsable(newIsUsable);
    }
  }, [selected, coupon.id, isCouponUsable, priceInfo.order]);

  return (
    <S.Container isUsable={isUsable}>
      <S.Hr />
      <S.CouponItemHeader>
        <Checkbox
          id={coupon.id.toString()}
          isChecked={isSelected}
          onClick={toggleCouponCheckbox}
          disabled={!isUsable}
        />
        <S.CouponName>{coupon.description}</S.CouponName>
      </S.CouponItemHeader>
      <S.CouponItemContent>
        {couponDetail.map((detail, index) => (
          <S.CouponDescription key={index}>{detail}</S.CouponDescription>
        ))}
      </S.CouponItemContent>
    </S.Container>
  );
};

export default CouponItem;
