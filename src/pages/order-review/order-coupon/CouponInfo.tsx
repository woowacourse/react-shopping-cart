import { CouponContent } from '@/api/type';
import CheckBox from '@/components/common/CheckBox';
import styled from '@emotion/styled';
import { useState } from 'react';

const CouponInfo = ({ coupon }: { coupon: CouponContent }) => {
  const [isChecked, setIsChecked] = useState(false); // TODO: 밖에서 넘겨줘야 함 2개 체크 알아야 하니까

  const handleOnToggle = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <CouponInfoWrapper>
      <CouponInfoTitle>
        <CheckBox isChecked={isChecked} onToggle={handleOnToggle} />
        <CouponName>{coupon.description}</CouponName>
      </CouponInfoTitle>
      <CouponName>만료일: {coupon.expirationDate}</CouponName>
      {coupon.minimumAmount && (
        <CouponName>최소 주문 금액: {coupon.minimumAmount}</CouponName>
      )}
      {coupon.availableTime && (
        <>
          <CouponName>
            사용 가능 시간: {coupon.availableTime.start} 부터{' '}
            {coupon.availableTime.end}
          </CouponName>
        </>
      )}
    </CouponInfoWrapper>
  );
};

export default CouponInfo;

const CouponInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px 0;
  border-top: 1px solid #e0e0e0;
  gap: 8px;
`;

const CouponInfoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CouponName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;
