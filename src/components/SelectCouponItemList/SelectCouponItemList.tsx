import SelectCouponItem from '../SelectCouponItem/SelectCouponItem';
import * as S from './SelectCouponItemList.style';

interface SelectCouponItemListProp {
  couponList: Coupon[];
}

const SelectCouponItemList = ({ couponList }: SelectCouponItemListProp) => {
  return (
    <S.SelectCouponItemContainer>
      {couponList.map((coupon: Coupon) => (
        <SelectCouponItem key={coupon.id} coupon={coupon} />
      ))}
    </S.SelectCouponItemContainer>
  );
};

export default SelectCouponItemList;
