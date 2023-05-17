import { useEffect } from 'react';
import { styled } from 'styled-components';
import useBucketCount from '@hooks/useBucketCount';
import useControlCart from '@hooks/useControlCart';
import {
  TEST_BUCKET_COUNTER_BOTTOM_BUTTON,
  TEST_BUCKET_COUNTER_TOP_BUTTON,
  TEST_CART_COUNT_INPUT,
} from '@constants/testId';
import { BOTTOM_ARROW, TOP_ARROW } from '@assets';

interface BucketCounterProps {
  id: number;
  quantity?: number;
}

const BucketCounter = ({ id, quantity = 1 }: BucketCounterProps) => {
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
    <Wrapper>
      <Count
        inputMode="numeric"
        value={bucketCount === 0 ? '' : bucketCount}
        onChange={onChange}
        ref={countRef}
        onBlur={onBlur}
        data-testid={TEST_CART_COUNT_INPUT}
      />
      <Counter>
        <TopButton
          data-testid={TEST_BUCKET_COUNTER_TOP_BUTTON}
          onClick={increaseCount}
        >
          <Image src={TOP_ARROW} alt="증가" />
        </TopButton>
        <BottomButton
          data-testid={TEST_BUCKET_COUNTER_BOTTOM_BUTTON}
          onClick={decreaseCount}
        >
          <Image src={BOTTOM_ARROW} alt="감소" />
        </BottomButton>
      </Counter>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  width: 65px;
  height: 28px;

  border: 1px solid #dddddd;
`;

const Count = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 42px;
  height: 28px;

  border: 1px solid #dddddd;

  outline: none;
`;

const Counter = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  width: 24px;
  height: 14px;
`;

const TopButton = styled(Button)`
  border-bottom: 0.5px solid #dddddd;
`;

const BottomButton = styled(Button)`
  border-top: 0.5px solid #dddddd;
`;

const Image = styled.img``;

export default BucketCounter;
