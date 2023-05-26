import { styled } from 'styled-components';
import useBucketCount from '@hooks/useBucketCount';
import fetchApi from '@utils/fetchApi';
import { CART_URL } from '@constants/common';
import {
  BUCKET_COUNTER_BOTTOM_BUTTON,
  BUCKET_COUNTER_TOP_BUTTON,
  CART_COUNT_INPUT,
} from '@constants/testId';
import { BOTTOM_ARROW, TOP_ARROW } from '@assets/images';

interface BucketCounterStyle {
  kind: 'small' | 'big';
}
interface BucketCounterProps extends BucketCounterStyle {
  id: number;
  quantity?: number;
  refetch: () => void;
}

const MAX_BUCKET_COUNT = 1000;
const ERROR_MESSAGE = '장바구니 수량은 1000개 이하까지 가능합니다.';

const BucketCounter = ({
  id,
  quantity = 1,
  kind,
  refetch,
}: BucketCounterProps) => {
  const {
    onBlur,
    bucketCount,
    onChange: changeCountEvent,
    increaseCount,
    decreaseCount,
    countRef,
  } = useBucketCount(quantity, {
    errorMessage: ERROR_MESSAGE,
    maximumCount: MAX_BUCKET_COUNT,
    id,
  });

  const changeCount = async (event: React.ChangeEvent<HTMLInputElement>) => {
    changeCountEvent(event);
    
    await fetchApi(`${CART_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity: Number(event.target.value) }),
      headers: {
        Authorization: 'Basic YUBhLmNvbToxMjM0',
        'Content-Type': 'application/json',
      },
    });

    refetch();
  };

  const upButton = async () => {
    await fetchApi(`${CART_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity: bucketCount }),
      headers: {
        Authorization: 'Basic YUBhLmNvbToxMjM0',
        'Content-Type': 'application/json',
      },
    });

    increaseCount();
    refetch();
  };

  const downButton = async () => {
    await fetchApi(`${CART_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity: bucketCount }),
      headers: {
        Authorization: 'Basic YUBhLmNvbToxMjM0',
        'Content-Type': 'application/json',
      },
    });

    decreaseCount();
    refetch();
  };

  const onBlurAndRefetch = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur(e);

    refetch();
  };

  return (
    <BucketCounterWrapper kind={kind}>
      <Count
        inputMode="numeric"
        value={bucketCount === 0 ? '' : bucketCount}
        onChange={changeCount}
        ref={countRef}
        onBlur={onBlurAndRefetch}
        data-testid={CART_COUNT_INPUT}
        kind={kind}
      />
      <Counter>
        <TopButton
          data-testid={BUCKET_COUNTER_TOP_BUTTON}
          onClick={upButton}
          kind={kind}
        >
          <Image src={TOP_ARROW} alt="증가" />
        </TopButton>
        <BottomButton
          data-testid={BUCKET_COUNTER_BOTTOM_BUTTON}
          onClick={downButton}
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

  width: ${({ kind }) => (kind === 'big' ? '112px' : '63px')};
  height: ${({ kind }) => (kind === 'big' ? '60px' : '28px')};

  border: 1px solid #dddddd;

  @media (max-width: 600px) {
    width: 65px;
    height: 28px;
  }
`;

const Count = styled.input<BucketCounterStyle>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ kind }) => (kind === 'big' ? '68px' : '42px')};
  height: ${({ kind }) => (kind === 'big' ? '60px' : '28px')};

  border: 1px solid #dddddd;

  text-align: center;

  outline: none;

  @media (max-width: 600px) {
    width: 42px;
    height: 28px;
  }
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

  width: ${({ kind }) => (kind === 'big' ? '42px' : '20px')};
  height: ${({ kind }) => (kind === 'big' ? '30px' : '14px')};

  @media (max-width: 600px) {
    width: 21px;
    height: 14px;
  }
`;

const TopButton = styled(Button)`
  border-bottom: 0.5px solid #dddddd;
`;

const BottomButton = styled(Button)`
  border-top: 0.5px solid #dddddd;
`;

const Image = styled.img``;

export default BucketCounter;
