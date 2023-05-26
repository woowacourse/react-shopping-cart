import { styled } from 'styled-components';
import useBucketCount from '@hooks/useBucketCount';
import { BOTTOM_ARROW, TOP_ARROW } from '@assets/images';
import { theme } from '@styles/theme';

type CounterStyleType = 'small' | 'large';
interface BucketCounterProps {
  counterStyle: CounterStyleType;
  id: number;
  quantity?: number;
  showMinCountAlert: boolean;
}

const BucketCounter = ({
  counterStyle,
  id,
  quantity = 1,
  showMinCountAlert,
}: BucketCounterProps) => {
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
    showMinCountAlert,
  });

  return (
    <Wrapper counterStyle={counterStyle}>
      <Count
        counterStyle={counterStyle}
        inputMode="numeric"
        value={bucketCount === 0 ? '' : bucketCount}
        onChange={onChange}
        ref={countRef}
        onBlur={onBlur}
        aria-label="장바구니 수량 입력 창"
      />
      <Counter>
        <TopButton
          counterStyle={counterStyle}
          aria-label="장바구니 수량 증가 버튼"
          onClick={increaseCount}
        >
          <Image counterStyle={counterStyle} src={TOP_ARROW} alt="증가" />
        </TopButton>
        <BottomButton
          counterStyle={counterStyle}
          aria-label="장바구니 수량 감소 버튼"
          onClick={decreaseCount}
        >
          <Image counterStyle={counterStyle} src={BOTTOM_ARROW} alt="감소" />
        </BottomButton>
      </Counter>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ counterStyle: CounterStyleType }>`
  display: flex;
  align-items: center;

  width: ${({ counterStyle }) => (counterStyle === 'small' ? '65px' : '115px')};
  height: ${({ counterStyle }) => (counterStyle === 'small' ? '28px' : '60px')};

  border: 1px solid ${theme.colors.whiteGray};
`;

const Count = styled.input<{ counterStyle: CounterStyleType }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ counterStyle }) => (counterStyle === 'small' ? '42px;' : '73px')};
  height: ${({ counterStyle }) =>
    counterStyle === 'small' ? '28px;' : '60px'};

  border: 1px solid ${theme.colors.whiteGray};

  font-counterstyle: ${({ counterStyle }) =>
    counterStyle === 'small' ? '12px' : '24px'};
  font-weight: 400;
  text-align: center;

  color: ${theme.colors.primaryBlack};
  outline: none;
`;

const Counter = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button<{ counterStyle: CounterStyleType }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ counterStyle }) => (counterStyle === 'small' ? '24px' : '42px')};
  height: ${({ counterStyle }) => (counterStyle === 'small' ? '14px' : '30px')};
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

const Image = styled.img<{ counterStyle: CounterStyleType }>`
  width: ${({ counterStyle }) => (counterStyle === 'small' ? '5px' : '9px')};
`;

export default BucketCounter;
