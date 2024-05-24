import { FlexColumn, FlexRow } from '@/style/common.style';
import { formatDate, formatHour } from '@/utils/formatDate';
import { useEffect, useState } from 'react';

import CheckBox from '@/components/Input/CheckBoxInput';
import { Coupon } from '@/types/coupon.type';
import { selectedCouponListState } from '@/store/atoms';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';
import useCanUseCoupon from '@/hooks/useCanUseCoupon';
import { useRecoilState } from 'recoil';

interface Props {
  coupon: Coupon;
}

const CouponItem = ({ coupon }: Props) => {
  const { description, expirationDate, minimumAmount, availableTime } = coupon;

  const [clicked, setClicked] = useState(false);
  const canUseCoupon = useCanUseCoupon({ coupon });
  const [selectedCoupon, setSelectedCoupon] = useRecoilState(
    selectedCouponListState
  );

  useEffect(() => {
    if (selectedCoupon.some((item) => item.id === coupon.id)) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  }, [selectedCoupon, coupon.id]);

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
    <StyledItemWrapper disable={!canUseCoupon}>
      <StyledRowBox isTitle={true}>
        <CheckBox
          isSelected={clicked}
          onClick={() => {
            if (canUseCoupon || clicked) {
              handleClick();
            }
          }}
        />
        {description}
      </StyledRowBox>
      <StyledRowBox>만료일 :{formatDate(expirationDate)}</StyledRowBox>
      {minimumAmount && (
        <StyledRowBox>최소 주문 금액: {minimumAmount}원</StyledRowBox>
      )}
      {availableTime && (
        <StyledRowBox>
          {`사용 가능 시간: ${formatHour(availableTime?.start)}부터
          ${formatHour(availableTime?.end)}까지`}
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
