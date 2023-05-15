import { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { showInputErorrMessage } from '@utils/common';
import {
  TEST_BUCKET_COUNTER_BOTTOM_BUTTON,
  TEST_BUCKET_COUNTER_TOP_BUTTON,
  TEST_CART_COUNT_INPUT,
} from '@constants/testId';
import { BOTTOM_ARROW, TOP_ARROW } from '@assets';

interface BucketCounterProps {
  removeProductFromCart: () => void;
  setIsClicked?: React.Dispatch<React.SetStateAction<boolean>>;
}

const MAX_BUCKET_COUNT = 1000;
const MAX_WRITE_INPUT_BUCKET_COUNT = 10000;
const ERROR_MESSAGE = '장바구니 수량은 1000개 이하까지 가능합니다.';

const BucketCounter = ({ setIsClicked }: BucketCounterProps) => {
  const [bucketCount, setBucketCount] = useState(1);
  const countRef = useRef<HTMLInputElement>(null);

  const changeCountEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const count = Number(value);

    if (isNaN(count)) return;

    showInputErorrMessage(isNotError(count), event.target, ERROR_MESSAGE);

    if (count >= MAX_WRITE_INPUT_BUCKET_COUNT) return;

    setBucketCount(count);
  };

  const showCounterErrorMessage = useCallback(() => {
    if (!countRef.current) return;

    showInputErorrMessage(
      isNotError(bucketCount),
      countRef.current,
      ERROR_MESSAGE
    );
  }, [bucketCount]);

  const increaseCount = () => {
    if (bucketCount + 1 >= MAX_WRITE_INPUT_BUCKET_COUNT) {
      showCounterErrorMessage();
      return;
    }

    setBucketCount((prev) => prev + 1);
  };

  const decreaseCount = () => {
    if (bucketCount - 1 === 0) {
      if (!setIsClicked) return;
      setIsClicked(false);
    }
    setBucketCount((prev) => prev - 1);
  };

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { relatedTarget, target } = event;

    if (relatedTarget?.parentElement?.parentElement === target.parentElement)
      return;

    if (bucketCount === 0) {
      if (!setIsClicked) return;

      setIsClicked(false);
    }
  };

  const isNotError = (count: number) => {
    return count <= MAX_BUCKET_COUNT;
  };

  useEffect(() => {
    showCounterErrorMessage();
  }, [bucketCount, showCounterErrorMessage]);

  useEffect(() => {
    if (!setIsClicked) return;
    if (bucketCount < 0) setIsClicked(false);
  }, [bucketCount, setIsClicked]);

  return (
    <Wrapper>
      <Count
        inputMode="numeric"
        value={bucketCount === 0 ? '' : bucketCount}
        onChange={changeCountEvent}
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
