import { useCallback, useEffect, useRef, useState } from 'react';
import { showInputErrorMessage } from '@utils/common';

interface useBucketCountOptions {
  removeProductFromCart: () => void;
  errorMessage: string;
  maximumCount: number;
}

const useBucketCount = (
  initialValue: number,
  options: useBucketCountOptions
) => {
  const { removeProductFromCart, errorMessage, maximumCount } = options;
  const maximumWriteInput = maximumCount * 10;
  const [bucketCount, setBucketCount] = useState(initialValue);
  const countRef = useRef<HTMLInputElement>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const count = Number(value);

    if (isNaN(count)) return;

    showInputErrorMessage(isCountError(count), event.target, errorMessage);

    if (count >= maximumWriteInput) return;

    setBucketCount(count);
  };

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

  const isCountError = useCallback(
    (count: number) => {
      return count > maximumCount;
    },
    [maximumCount]
  );

  const showCounterErrorMessage = useCallback(() => {
    if (!countRef.current) return;

    showInputErrorMessage(
      isCountError(bucketCount),
      countRef.current,
      errorMessage
    );
  }, [bucketCount, errorMessage, isCountError]);

  useEffect(() => {
    showCounterErrorMessage();
  }, [bucketCount, showCounterErrorMessage]);

  return {
    onBlur,
    bucketCount,
    onChange,
    increaseCount,
    decreaseCount,
    countRef,
  };
};

export default useBucketCount;
