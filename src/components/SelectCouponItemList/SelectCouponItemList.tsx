import * as S from './SelectCouponItemList.style';
import { SelectCouponItem } from '../SelectCouponItem/SelectCouponItem.style';

interface SelectCouponItemListProp {
  couponList: Coupon[];
}

const SelectCouponItemList = ({ couponList }: SelectCouponItemListProp) => {
  return (
    <S.SelectCouponItemContainer>
      {couponList.map((coupon: Coupon) => (
        <SelectCouponItem coupon={coupon} />
      ))}
    </S.SelectCouponItemContainer>
  );
};

export default SelectCouponItemList;
