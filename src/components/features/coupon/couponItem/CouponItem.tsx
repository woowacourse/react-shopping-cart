import { SelectBox, Separator } from '@/components/common';
import { formatAvailableTime } from '@/shared/utils/formatAvailableTime';
import { formatDateToKorean } from '@/shared/utils/formatDate';
import { CouponType } from '../types';
import * as S from './CouponItem.styles';

interface CouponItemProps {
  item: CouponType;
  isSelected: boolean;
  toggleSelect: () => void;
}

function CouponItem({ item, isSelected, toggleSelect }: CouponItemProps) {
  const hasMinimumAmount = (item: CouponType) => {
    return 'minimumAmount' in item;
  };

  const hasAvailableItem = (item: CouponType) => {
    return 'availableTime' in item;
  };

  return (
    <S.Container>
      <Separator />
      <S.TitleRow>
        <SelectBox selected={isSelected} onClick={toggleSelect} />
        <S.Title>{item.description}</S.Title>
      </S.TitleRow>
      <S.DescriptionBox>
        <S.Description>
          만료일: {formatDateToKorean(item.expirationDate)}
        </S.Description>
        {hasMinimumAmount(item) && (
          <S.Description>
            최소 주문 금액: {item.minimumAmount.toLocaleString()}원
          </S.Description>
        )}
        {hasAvailableItem(item) && (
          <S.Description>
            사용 가능 시간: {formatAvailableTime(item.availableTime)}
          </S.Description>
        )}
      </S.DescriptionBox>
    </S.Container>
  );
}

export default CouponItem;
