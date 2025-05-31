import styled from '@emotion/styled';

interface CounterProps {
  canBeZero?: boolean;
  count: number;
  maxCount?: number;
  onMinusClick: () => void;
  onPlusClick: () => void;
  autoFocus?: boolean;
}

function Counter({
  canBeZero = false,
  count,
  maxCount = -1,
  onMinusClick,
  onPlusClick,
  autoFocus = false,
  ...props
}: CounterProps) {
  const showTrash = canBeZero === true && count === 1;
  const isMaxCountReached = maxCount > 0 && count >= maxCount;

  return (
    <QuantityControls {...props}>
      <QuantityButton
        onClick={onMinusClick}
        disabled={!canBeZero && count <= 1}
        aria-label={showTrash ? '삭제' : '수량 감소'}
        autoFocus={autoFocus}
      >
        {showTrash ? (
          <TrashIcon
            src={`${import.meta.env.BASE_URL}/assets/icons/Trash.svg`}
          />
        ) : (
          '−'
        )}
      </QuantityButton>
      <QuantityDisplay aria-label='수량'>{count}</QuantityDisplay>
      <QuantityButton
        onClick={onPlusClick}
        aria-label='수량 증가'
        disabled={isMaxCountReached}
      >
        +
      </QuantityButton>
    </QuantityControls>
  );
}

const TrashIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: #666;

  &:hover {
    background-color: #f5f5f5;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  font-size: 16px;
  font-weight: 500;
  min-width: 20px;
  text-align: center;
  color: #000;
`;

export default Counter;
