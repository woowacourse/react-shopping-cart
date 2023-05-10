import { useEffect, useState } from 'react';
import { BOTTOM_ARROW, TOP_ARROW } from '@assets';
import { styled } from 'styled-components';

interface BucketCounterProps {
  setIsClicked?: React.Dispatch<React.SetStateAction<boolean>>;
}

const BucketCounter = ({ setIsClicked }: BucketCounterProps) => {
  const [bucketCount, setBucketCount] = useState(1);

  useEffect(() => {
    if (!setIsClicked) return;
    if (bucketCount < 0) setIsClicked(false);
  }, [bucketCount, setIsClicked]);

  const changeCountEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const onlyNumberExpression = /[^0-9]/g;

    if (onlyNumberExpression.test(value)) return;

    setBucketCount(Number(event.target.value));
  };

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
