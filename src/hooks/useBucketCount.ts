import { useCallback, useEffect, useRef, useState } from 'react';
import { showInputErrorMessage } from '@utils/common';
import fetchApi from '@utils/fetchApi';
import { CART_URL } from '@constants/common';
import useControlCart from './useControlCart';

interface useBucketCountOptions {
  errorMessage: string;
  maximumCount: number;
  id: number;
}

const useBucketCount = (
  initialValue: number,
  { errorMessage, maximumCount, id }: useBucketCountOptions,
  refetch: () => void
) => {
  const maximumWriteInput = maximumCount * 10;

  const { removeProductFromCart, updateQuantityOfCartItem } = useControlCart();

  const [bucketCount, setBucketCount] = useState(initialValue);
  const countRef = useRef<HTMLInputElement>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const count = Number(value);

    if (isNaN(count)) return;

    showInputErrorMessage(isCountError(count), event.target, errorMessage);

    if (count >= maximumWriteInput) return;
    setBucketCount(count);
    updateQuantityOfCartItem(id, count);
  };

  const increaseCount = () => {
    if (bucketCount + 1 >= maximumWriteInput) {
      showCounterErrorMessage();
      return;
    }

    setBucketCount((prev) => prev + 1);

    updateQuantityOfCartItem(id, bucketCount + 1);
  };

  const decreaseCount = () => {
    if (bucketCount <= 1) {
      removeProductFromCart(id);
      return;
    }
    updateQuantityOfCartItem(id, bucketCount - 1);

    setBucketCount((prev) => prev - 1);
  };

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { relatedTarget, target } = event;

    if (relatedTarget?.parentElement?.parentElement === target.parentElement)
      return;

    if (bucketCount === 0) removeProductFromCart(id);
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

  const bucketCountFetch = async (replacementQuantity:number)=>{
    await fetchApi(`${CART_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity: replacementQuantity }),
      headers: {
        Authorization: 'Basic YUBhLmNvbToxMjM0',
        'Content-Type': 'application/json',
      },
    });
  }

  const changeCount = async (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);

    bucketCountFetch(Number(event.target.value))

    refetch();
  };

  const upButton = async () => {
    bucketCountFetch(bucketCount)

    increaseCount();

    refetch();
  };

  const downButton = async () => {
    bucketCountFetch(bucketCount)

    decreaseCount();

    refetch();
  };

  const onBlurAndRefetch = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur(e);

    refetch();
  };

  return {
    bucketCount,
    countRef,
    changeCount,
    upButton,
    downButton,
    onBlurAndRefetch,
  };
};

export default useBucketCount;
