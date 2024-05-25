import Text from '../common/Text/Text';
import NOTICE from '../../assets/notice.svg?react';
import * as S from './SelectCouponModalSection.style';
import useCouponList from '../../hooks/coupon/useCouponList';
import SelectCouponItem from '../SelectCouponItem/SelectCouponItem';
import useFetchCouponList from '../../hooks/coupon/useFetchCouponList';

const SelectCouponModalSection = () => {
  const { couponList } = useCouponList();
  const { fetchCouponList } = useFetchCouponList();
  fetchCouponList();

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
