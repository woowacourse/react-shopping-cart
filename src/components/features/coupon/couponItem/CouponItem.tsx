import { SelectBox, Separator } from '@/components/common';
import { formatAvailableTime } from '@/shared/utils/formatAvailableTime';
import { formatDateToKorean } from '@/shared/utils/formatDate';
import * as S from './CouponItem.styles';
import Coupon from '../models/coupon';
import { CouponType } from '../models/coupon.types';

interface CouponItemProps {
  item: Coupon;
  isSelected: boolean;
  toggleSelect: () => void;
}

function CouponItem({ item, isSelected, toggleSelect }: CouponItemProps) {
  const hasMinimumAmount = (data: CouponType) => {
    return 'minimumAmount' in data;
  };

  const hasAvailableItem = (data: CouponType) => {
    return 'availableTime' in data;
  };

  return (
    <S.Container>
      <Separator />
      <S.TitleRow>
        <SelectBox selected={isSelected} onClick={toggleSelect} />
        <S.Title>{item.data.description}</S.Title>
      </S.TitleRow>
      <S.DescriptionBox>
        <S.Description>
          만료일: {formatDateToKorean(item.data.expirationDate)}
        </S.Description>
        {hasMinimumAmount(item.data) && (
          <S.Description>
            최소 주문 금액: {item.data.minimumAmount.toLocaleString()}원
          </S.Description>
        )}
        {hasAvailableItem(item.data) && (
          <S.Description>
            사용 가능 시간: {formatAvailableTime(item.data.availableTime)}
          </S.Description>
        )}
      </S.DescriptionBox>
    </S.Container>
  );
}

export default CouponItem;
