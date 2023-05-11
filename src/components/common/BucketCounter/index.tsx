import { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { isNotNumber, showInputErorrMessage } from '@utils/common';
import { BOTTOM_ARROW, TOP_ARROW } from '@assets';

interface BucketCounterProps {
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

    if (isNotNumber(value)) return;

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
    setBucketCount((prev) => prev - 1);
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
        value={bucketCount === 0 ? '' : bucketCount}
        onChange={changeCountEvent}
        ref={countRef}
      ></Count>
      <Counter>
        <TopButton onClick={increaseCount}>
          <Image src={TOP_ARROW} alt="증가" />
        </TopButton>
        <BottomButton onClick={decreaseCount}>
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
