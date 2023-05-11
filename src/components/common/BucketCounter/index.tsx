import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { isNotNumber } from '@utils/common';
import { BOTTOM_ARROW, TOP_ARROW } from '@assets';

interface BucketCounterProps {
  setIsClicked?: React.Dispatch<React.SetStateAction<boolean>>;
}

const MAX_BUCKET_COUNT = 1000;
const SHOW_ERROR_BUCKET_COUNT = 10000;

const BucketCounter = ({ setIsClicked }: BucketCounterProps) => {
  const [bucketCount, setBucketCount] = useState(1);

  const changeCountEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const count = Number(value);

    if (isNotNumber(value)) return;

    showErorrMessage(count, event);

    if (count >= SHOW_ERROR_BUCKET_COUNT) return;

    setBucketCount(count);
  };

  const showErorrMessage = (
    count: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (count <= MAX_BUCKET_COUNT) {
      event.target.setCustomValidity('');
      return;
    }

    event.target.setCustomValidity(
      '장바구니 수량은 1000개 이하까지 가능합니다.'
    );
    event.target.reportValidity();
  };

  useEffect(() => {
    if (!setIsClicked) return;
    if (bucketCount < 0) setIsClicked(false);
  }, [bucketCount, setIsClicked]);

  return (
    <Wrapper>
      <Count
        value={bucketCount === 0 ? '' : bucketCount}
        onChange={changeCountEvent}
      ></Count>
      <Counter>
        <TopButton onClick={() => setBucketCount((prev) => prev + 1)}>
          <Image src={TOP_ARROW} alt="증가" />
        </TopButton>
        <BottomButton onClick={() => setBucketCount((prev) => prev - 1)}>
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
