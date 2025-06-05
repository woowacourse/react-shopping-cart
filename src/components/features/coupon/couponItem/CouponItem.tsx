import { SelectBox, Separator } from '@/components/common';
import * as S from './CouponItem.styles';
import { CouponType } from '../types';
import { formatAvailableTime } from '@/shared/utils/formatAvailableTime';
import { formatDateToKorean } from '@/shared/utils/formatDate';

interface CouponItemProps {
  item: CouponType;
}

function CouponItem({ item }: CouponItemProps) {
  return (
    <S.Container>
      <Separator />
      <S.TitleRow>
        <SelectBox selected={true} />
        <S.Title>{item.description}</S.Title>
      </S.TitleRow>
      <S.DescriptionBox>
        <S.Description>
          만료일: {formatDateToKorean(item.expirationDate)}
        </S.Description>
        {'minimumAmount' in item && (
          <S.Description>
            최소 주문 금액: {item.minimumAmount.toLocaleString()}원
          </S.Description>
        )}
        {'availableTime' in item && (
          <S.Description>
            사용 가능 시간: {formatAvailableTime(item.availableTime)}
          </S.Description>
        )}
      </S.DescriptionBox>
    </S.Container>
  );
}

export default CouponItem;
