import styled from 'styled-components';
import { NotificationIcon } from '../../asset';
import { MESSAGES } from '../../constants/Messages';
import { useRecoilState, useRecoilValue } from 'recoil';
import { couponsState } from '../../recoil/atoms';
import { Coupon } from '../../types/coupon';
import CouponCard from '../CouponCard/CouponCard';
import { fetchCouponsSelector } from '../../recoil/fetchSelectors';
import { useEffect } from 'react';
import { useValidateCoupons } from '../../recoil/useRecoilCallback';

const CouponListContainer = styled.div`
  margin-top: 3.6rem;
  margin-bottom: 5.2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const NotificationIconImg = styled.img`
  width: 1.2rem;
  height: 1.2rem;
`;

const InformationMsg = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  gap: 0.4rem;
`;
function CouponModalContent() {
  const fetchCoupons = useRecoilValue(fetchCouponsSelector);
  useValidateCoupons()();
  const [coupons, setCoupons] = useRecoilState(couponsState);
  useEffect(() => {
    setCoupons(fetchCoupons);
  }, [fetchCoupons, setCoupons]);

  return (
    <CouponListContainer>
      <InformationMsg>
        <NotificationIconImg src={NotificationIcon} alt="Notification Icon" />
        {MESSAGES.cartNotification}
      </InformationMsg>
      {coupons.map((coupon: Coupon) => {
        return <CouponCard key={coupon.id} coupon={coupon} />;
      })}
    </CouponListContainer>
  );
}

export default CouponModalContent;
