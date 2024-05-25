import styled from 'styled-components';
import { Coupon } from '../../types/coupon';
import CheckBox from '../CheckBox/CheckBox';
import Title from '../Title/Title';
import { useRecoilState } from 'recoil';
import { couponDetailState } from '../../recoil/atoms';
import { formatAvailableTime, formatDate } from '../../utils/Time';
import useCouponApplicable from '../../hooks/useCouponApplicable';

const CardContainer = styled.li<{ $disabled: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 1rem 0 0 0;
  gap: 1rem;
  border-color: rgba(0, 0, 0, 0.1);
  border-width: 0.5px 0 0 0;
  border-style: solid;
  color: ${(props) => (props.$disabled ? 'rgba(0, 0, 0, 0.1)' : '')};
`;

const CardHeader = styled.div`
  display: flex;
  gap: 5px;
`;

const CardDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
interface CouponCardProps {
  coupon: Coupon;
}
function CouponCard({ coupon }: CouponCardProps) {
  const [couponDetail, setCouponDetail] = useRecoilState(
    couponDetailState(coupon.id),
  );
  const disabled = !useCouponApplicable(coupon, couponDetail);

  const handleCheckedItem = () => {
    setCouponDetail((prevState) => !prevState);
  };

  return (
    <CardContainer $disabled={disabled}>
      <CardHeader>
        <CheckBox
          isChecked={couponDetail}
          onClick={handleCheckedItem}
          disabled={disabled}
        />
        <Title title={coupon.description}></Title>
      </CardHeader>
      <CardDetail>
        <span>{formatDate(coupon.expirationDate)}</span>
        {coupon.minimumAmount && (
          <span>{`${coupon.minimumAmount.toLocaleString()}원`}</span>
        )}
        {coupon.availableTime && (
          <span>
            {formatAvailableTime(
              coupon.availableTime.start,
              coupon.availableTime.end,
            )}
          </span>
        )}
      </CardDetail>
    </CardContainer>
  );
}

export default CouponCard;
