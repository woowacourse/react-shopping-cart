import { styled } from 'styled-components';
import useBucketCount from '@hooks/useBucketCount';
import { BOTTOM_ARROW, TOP_ARROW } from '@assets/images';
import { theme } from '@styles/theme';

type CounterStyleType = 'small' | 'cart';
interface BucketCounterProps {
  kind: CounterStyleType;
  id: number;
  quantity?: number;
}

const BucketCounter = ({ kind, id, quantity = 1 }: BucketCounterProps) => {
  const {
    bucketCount,
    onBlur,
    onChange,
    increaseCount,
    decreaseCount,
    countRef,
  } = useBucketCount(quantity, {
    errorMessage: '장바구니 수량은 1000개 이하까지 가능합니다.',
    maximumCount: 1000,
    id,
  });

  return (
    <Wrapper kind={kind}>
      <Count
        kind={kind}
        inputMode="numeric"
        value={bucketCount === 0 ? '' : bucketCount}
        onChange={onChange}
        ref={countRef}
        onBlur={onBlur}
        aria-label="장바구니 수량 입력 창"
      />
      <Counter>
        <TopButton
          kind={kind}
          aria-label="장바구니 수량 증가 버튼"
          onClick={increaseCount}
        >
          <Image kind={kind} src={TOP_ARROW} alt="증가" />
        </TopButton>
        <BottomButton
          kind={kind}
          aria-label="장바구니 수량 감소 버튼"
          onClick={decreaseCount}
        >
          <Image kind={kind} src={BOTTOM_ARROW} alt="감소" />
        </BottomButton>
      </Counter>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ kind: CounterStyleType }>`
  display: flex;
  align-items: center;

  width: ${({ kind }) => (kind === 'small' ? '65px' : '115px')};
  height: ${({ kind }) => (kind === 'small' ? '28px' : '60px')};

  border: 1px solid ${theme.colors.whiteGray};
`;

const Count = styled.input<{ kind: CounterStyleType }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ kind }) => (kind === 'small' ? '42px;' : '73px')};
  height: ${({ kind }) => (kind === 'small' ? '28px;' : '60px')};

  border: 1px solid ${theme.colors.whiteGray};

  font-size: ${({ kind }) => (kind === 'small' ? '12px' : '24px')};
  font-weight: 400;
  text-align: center;

  color: ${theme.colors.primaryBlack};
  outline: none;
`;

const Counter = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button<{ kind: CounterStyleType }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ kind }) => (kind === 'small' ? '24px' : '42px')};
  height: ${({ kind }) => (kind === 'small' ? '14px' : '30px')};
  border: none;

  background: none;
  cursor: pointer;
`;

const TopButton = styled(Button)`
  border-bottom: 0.5px solid ${theme.colors.whiteGray};
`;

const BottomButton = styled(Button)`
  border-top: 0.5px solid ${theme.colors.whiteGray};
`;

const Image = styled.img<{ kind: CounterStyleType }>`
  width: ${({ kind }) => (kind === 'small' ? '5px' : '9px')};
`;

export default BucketCounter;
