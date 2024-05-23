import { FlexColumn, FlexRow } from '@/style/common.style';
import { useEffect, useMemo, useState } from 'react';

import CheckBox from '../Input/CheckBoxInput';
import { Coupon } from '@/types/coupon.type';
import { selectedCouponListState } from '@/store/atoms';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';
import useCouponAvailable from '@/hooks/useCouponAvailable';
import useCouponValidator from '@/hooks/useCouponValidator';
import { useRecoilState } from 'recoil';

interface Props {
  coupon: Coupon;
}

const CouponItem = ({ coupon }: Props) => {
  const date = new Date();
  const [clicked, setClicked] = useState(false);

  const isValid = useCouponValidator({ coupon, date });
  const isAvailable = useCouponAvailable({ coupon, date });

  const [selectedCoupon, setSelectedCoupon] = useRecoilState(
    selectedCouponListState
  );

  const isSelected = selectedCoupon?.some((item) => item.id === coupon.id);

  useEffect(() => {
    if (isSelected) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  }, [isSelected, selectedCoupon, coupon.id]);

  const disable = useMemo(() => {
    if (selectedCoupon && selectedCoupon.length >= 2 && !isSelected) {
      return true;
    }

    return !isValid || !isAvailable;
  }, [isValid, isAvailable, selectedCoupon, isSelected]);

  const handleClick = () => {
    if (!clicked) {
      selectedCoupon && setSelectedCoupon(() => [...selectedCoupon, coupon]);
      !selectedCoupon && setSelectedCoupon([coupon]);
      setClicked(true);
    } else {
      setSelectedCoupon((prevSelectedCoupons) =>
        prevSelectedCoupons
          ? prevSelectedCoupons.filter((item) => item.id !== coupon.id)
          : []
      );
      setClicked(false);
    }
  };

  return (
    <StyledItemWrapper disable={disable}>
      <StyledRowBox isTitle={true}>
        {/* TODO: 조건식 변경 */}
        <CheckBox
          isSelected={clicked}
          onClick={() => {
            if (!disable || clicked) {
              handleClick();
            }
          }}
        />
        {coupon.description}
      </StyledRowBox>
      {/* TODO: 날짜 포맷팅 */}
      <StyledRowBox>만료일 :{coupon.expirationDate}</StyledRowBox>
      {coupon.minimumAmount && (
        <StyledRowBox>최소 주문 금액: {coupon.minimumAmount}원</StyledRowBox>
      )}
      {/* TODO: 시간 포맷팅 */}
      {coupon.availableTime && (
        <StyledRowBox>
          사용 가능 시간: {coupon.availableTime?.start}부터
          {coupon.availableTime?.end}까지
        </StyledRowBox>
      )}
    </StyledItemWrapper>
  );
};

export default CouponItem;

const StyledItemWrapper = styled.div<{ disable?: boolean }>`
  ${FlexColumn}
  justify-content: space-around;
  width: 100%;
  height: 80px;
  margin-top: 10px;
  border-top: 1px solid ${theme.color.blackWithOpacity};
  padding: 10px 0;
  color: ${({ disable }) => disable && theme.color.grey};
`;

const StyledRowBox = styled.div<{ isTitle?: boolean }>`
  ${FlexRow}
  align-items: center;
  gap: 10px;
  font-size: ${({ isTitle }) =>
    isTitle ? theme.fontSize.medium : theme.fontSize.small};
  font-weight: ${({ isTitle }) => isTitle && theme.fontWeight.bold};
`;
