import styled from "styled-components";

export interface CounterProps {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
  minCount?: number;
  maxCount?: number;
}

export default function Counter({
  count,
  onIncrease,
  onDecrease,
  minCount,
  maxCount,
}: CounterProps) {
  const isDecreaseDisabled = minCount !== undefined && count <= minCount;
  const isIncreaseDisabled = maxCount !== undefined && count >= maxCount;

  return (
    <S.Container>
      <S.CountButton disabled={isDecreaseDisabled} onClick={onDecrease}>
        -
      </S.CountButton>
      <S.Count>{count}</S.Count>
      <S.CountButton disabled={isIncreaseDisabled} onClick={onIncrease}>
        +
      </S.CountButton>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
  `,

  CountButton: styled.button`
    width: 24px;
    height: 24px;
    line-height: 10px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: white;
    border-radius: 8px;
  `,

  Count: styled.div`
    font-size: 12px;
    width: 20px;
    text-align: center;
  `,
};
