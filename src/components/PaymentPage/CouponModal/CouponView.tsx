import styled from "styled-components";
import { Coupon } from "../../../types/coupon";
import { formatToKRW } from "../../../utils/domain/formatToKRW";

export interface CouponProps {
  coupon: Coupon;
  toggleSelection: () => void;
  hasReachedMaxCount: boolean;
}

export default function CouponView({
  coupon: {
    id,
    description,
    minimumAmount,
    expirationDate,
    availableTime,
    isSelected,
    isSelectable,
  },
  toggleSelection,
  hasReachedMaxCount,
}: CouponProps) {
  const isNoLongerSelectable = !isSelected && hasReachedMaxCount;

  return (
    <S.Container $isSelectable={isSelectable}>
      <S.Title>
        <S.Checkbox
          id={`${id}`}
          type="checkbox"
          checked={isSelected}
          onChange={toggleSelection}
          disabled={!isSelectable || isNoLongerSelectable}
        />
        <label htmlFor={`${id}`}>
          <S.Description>{description}</S.Description>
        </label>
      </S.Title>
      {expirationDate && <S.Requirement>만료일: {expirationDate}까지</S.Requirement>}
      {minimumAmount && <S.Requirement>최소 주문 금액: {formatToKRW(minimumAmount)}</S.Requirement>}
      {availableTime && (
        <S.Requirement>
          사용 가능 시간: {availableTime.start} ~ {availableTime.end}
        </S.Requirement>
      )}
      <S.Requirement>사용 가능 여부: {isSelectable ? "사용 가능" : "사용 불가능"}</S.Requirement>
    </S.Container>
  );
}

const S = {
  Container: styled.div<{ $isSelectable: boolean }>`
    border-top: 1px solid rgba(51, 51, 51, 0.15);
    padding-top: 13px;

    color: ${({ $isSelectable }) => ($isSelectable ? "" : "rgba(51, 51, 51, 0.35)")};
  `,

  Title: styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
  `,

  Description: styled.div`
    font-size: 16px;
    font-weight: 700;
  `,

  Requirement: styled.div`
    font-size: 12px;
  `,

  Checkbox: styled.input`
    accent-color: black;
    margin: 0;
    width: 20px;
    height: 20px;
  `,
};
