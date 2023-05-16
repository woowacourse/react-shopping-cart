import { useCallback, useEffect, useRef, useState } from 'react';
import { isNotNumber, showInputErorrMessage } from '@utils/common';

interface useBucketCountOptions {
    removeProductFromCart: () => void;
    errorMessage: string;
    maximumCount: number;
}

const useBucketCount = (initialValue:number, options:useBucketCountOptions)=> {
  const { removeProductFromCart, errorMessage, maximumCount } = options;
  const maximumWriteInput = maximumCount * 10;
  const [bucketCount, setBucketCount] = useState(initialValue);
  const countRef = useRef<HTMLInputElement>(null);

  const isNotError = useCallback(
    (count: number) => {
      return count <= maximumCount;
    },
    [maximumCount]
  );

  const changeCountEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const count = Number(value);

    if (isNotNumber(value)) return;

    showInputErorrMessage(isNotError(count), event.target, errorMessage);

    if (count >= maximumWriteInput) return;

    setBucketCount(count);
  };

  const showCounterErrorMessage = useCallback(() => {
    if (!countRef.current) return;

    showInputErorrMessage(
      isNotError(bucketCount),
      countRef.current,
      errorMessage
    );
  }, [bucketCount, isNotError, errorMessage]);

  const increaseCount = () => {
    if (bucketCount + 1 >= maximumWriteInput) {
      showCounterErrorMessage();
      return;
    }

    setBucketCount((prev) => prev + 1);
  };

  const decreaseCount = () => {
    if (bucketCount <= 1) {
      removeProductFromCart();
    }
    setBucketCount((prev) => prev - 1);
  };

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { relatedTarget, target } = event;

    if (relatedTarget?.parentElement?.parentElement === target.parentElement)
      return;

    if (bucketCount === 0) removeProductFromCart();
  };

   useEffect(() => {
    showCounterErrorMessage();
  }, [bucketCount, showCounterErrorMessage]);

  return {
    onBlur,
    bucketCount,
    onChange: changeCountEvent,
    increaseCount,
    decreaseCount,
    countRef,
  };
};

export default useBucketCount;
