import Text from '../common/Text/Text';
import NOTICE from '../../assets/notice.svg?react';
import * as S from './SelectCouponModalSection.style';
import SelectCouponItemList from '../SelectCouponItemList/SelectCouponItemList';
import useApiErrorState from '../../hooks/error/useApiErrorState';
import useCouponList from '../../hooks/coupon/useCouponList';
import { useEffect } from 'react';

const SelectCouponModalSection = () => {
  const { apiError } = useApiErrorState();
  const { couponList, fetchCouponList } = useCouponList();

  useEffect(() => {
    fetchCouponList();
  }, []);

  if (apiError?.name === 'FailedFetchCouponListError') {
    throw apiError;
  }

  return (
    <S.SelectCouponModalSection>
      <S.NoticeContainer>
        <NOTICE />
        <Text size="s" weight="m">
          쿠폰은 최대 2개까지 사용할 수 있습니다.
        </Text>
      </S.NoticeContainer>
      <SelectCouponItemList couponList={couponList} />
    </S.SelectCouponModalSection>
  );
};

export default SelectCouponModalSection;
