import { SelectBox, Separator } from '@/components/common';
import {
  Coupon,
  CouponType,
  formatAvailableTime,
  formatDateToKorean,
} from '..';
import * as S from './CouponItem.styles';

interface CouponItemProps {
  item: Coupon;
  selected: boolean;
  disabled?: boolean;
  toggleSelect: () => void;
}

function CouponItem({
  item,
  selected,
  disabled,
  toggleSelect,
}: CouponItemProps) {
  const hasMinimumAmount = (data: CouponType) => {
    return 'minimumAmount' in data;
  };

  const hasAvailableItem = (data: CouponType) => {
    return 'availableTime' in data;
  };

  return (
    <S.Container disabled={disabled}>
      <Separator />
      <S.TitleRow>
        <SelectBox
          id={item.data.id.toString()}
          selected={selected}
          onClick={toggleSelect}
          disabled={disabled}
        />
        <S.Title htmlFor={item.data.id.toString()}>
          {item.data.description}
        </S.Title>
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
