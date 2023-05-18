import { styled } from 'styled-components';
import useBucketCount from 'hooks/useBucketCount';
import {
  BUCKET_COUNTER_BOTTOM_BUTTON,
  BUCKET_COUNTER_TOP_BUTTON,
  CART_COUNT_INPUT,
} from '@constants/testId';
import { BOTTOM_ARROW, TOP_ARROW } from '@assets';

interface BucketCounterStyle {
  kind: 'small' | 'big';
}
interface BucketCounterProps extends BucketCounterStyle {
  removeProductFromCart: () => void;
}

const MAX_BUCKET_COUNT = 1000;
const ERROR_MESSAGE = '장바구니 수량은 1000개 이하까지 가능합니다.';

const BucketCounter = ({ removeProductFromCart, kind }: BucketCounterProps) => {
  const {
    onBlur,
    bucketCount,
    onChange: changeCountEvent,
    increaseCount,
    decreaseCount,
    countRef,
  } = useBucketCount(1, {
    removeProductFromCart,
    errorMessage: ERROR_MESSAGE,
    maximumCount: MAX_BUCKET_COUNT,
  });

  return (
    <BucketCounterWrapper kind={kind}>
      <Count
        inputMode="numeric"
        value={bucketCount === 0 ? '' : bucketCount}
        onChange={changeCountEvent}
        ref={countRef}
        onBlur={onBlur}
        data-testid={CART_COUNT_INPUT}
        kind={kind}
      />
      <Counter>
        <TopButton
          data-testid={BUCKET_COUNTER_TOP_BUTTON}
          onClick={increaseCount}
          kind={kind}
        >
          <Image src={TOP_ARROW} alt="증가" />
        </TopButton>
        <BottomButton
          data-testid={BUCKET_COUNTER_BOTTOM_BUTTON}
          onClick={decreaseCount}
          kind={kind}
        >
          <Image src={BOTTOM_ARROW} alt="감소" />
        </BottomButton>
      </Counter>
    </BucketCounterWrapper>
  );
};

const BucketCounterWrapper = styled.div<BucketCounterStyle>`
  display: flex;
  align-items: center;

  width: ${({ kind }) => (kind === 'big' ? '115px' : '65px')};
  height: ${({ kind }) => (kind === 'big' ? '60px' : '28px')};

  border: 1px solid #dddddd;
`;

const Count = styled.input<BucketCounterStyle>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ kind }) => (kind === 'big' ? '66px' : '42px')};
  height: ${({ kind }) => (kind === 'big' ? '56px' : '28px')};

  border: 1px solid #dddddd;

  outline: none;
`;

const Counter = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button<BucketCounterStyle>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;

  width: ${({ kind }) => (kind === 'big' ? '42px' : '24px')};
  height: ${({ kind }) => (kind === 'big' ? '30px' : '14px')};
`;

const TopButton = styled(Button)`
  border-bottom: 0.5px solid #dddddd;
`;

const BottomButton = styled(Button)`
  border-top: 0.5px solid #dddddd;
`;

const Image = styled.img``;

export default BucketCounter;
