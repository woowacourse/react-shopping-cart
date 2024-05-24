import * as S from './SelectCouponModalSection.style';

import SelectCouponItem from '../SelectCouponItem/SelectCouponItem';

import NOTICE from '../../assets/notice.svg?react';
import Text from '../common/Text/Text';
import useFetchCouponList from '../../hooks/coupon/useFetchCouponList';
import useCouponList from '../../hooks/coupon/useCouponList';

const SelectCouponModalSection = () => {
  const { fetchCouponList } = useFetchCouponList();
  fetchCouponList();

  const { couponList } = useCouponList();

  return (
    <S.SelectCouponModalSection>
      <S.NoticeContainer>
        <NOTICE />
        <Text size="s" weight="m">
          쿠폰은 최대 2개까지 사용할 수 있습니다.
        </Text>
      </S.NoticeContainer>
      <S.SelectCouponItemContainer>
        {couponList.map((coupon) => (
          <SelectCouponItem coupon={coupon} />
        ))}
      </S.SelectCouponItemContainer>
    </S.SelectCouponModalSection>
  );
};

export default SelectCouponModalSection;
