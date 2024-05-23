import { CouponProps } from '../../types';
import { Button } from '../common/button/Button';
import CheckedButtonIcon from '../../assets/CheckedButtonIcon.png';
import UnCheckedButtonIcon from '../../assets/UncheckedButtonIcon.png';
import {
  StyledCouponContainer,
  StyledCouponDetail,
  StyledCouponDetailWrapper,
  StyledCouponSelectWrapper,
  StyledCouponTitle,
} from './CouponItem.styled';

export interface CouponItemProps {
  selected: boolean;
  item: CouponProps;
}

export const CouponItem: React.FC<CouponItemProps> = ({ item, selected }) => {
  return (
    <StyledCouponContainer>
      <StyledCouponSelectWrapper>
        <Button
          onClick={() => console.log('버튼 클릭')}
          clicked={selected}
          iconSrc={selected ? CheckedButtonIcon : UnCheckedButtonIcon}
        />
        <StyledCouponTitle>{item.description}</StyledCouponTitle>
      </StyledCouponSelectWrapper>
      <StyledCouponDetailWrapper>
        {item.expirationDate && <span>만료일: {item.expirationDate}</span>}
        {item.minimumAmount && (
          <StyledCouponDetail>
            최소 주문 금액: {item.minimumAmount}원
          </StyledCouponDetail>
        )}
        {item.availableTime && (
          <StyledCouponDetail>
            {item.availableTime.start}시부터 {item.availableTime.end}시까지
          </StyledCouponDetail>
        )}
      </StyledCouponDetailWrapper>
    </StyledCouponContainer>
  );
};
