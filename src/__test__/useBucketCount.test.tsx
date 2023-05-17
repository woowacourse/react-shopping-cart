import React from 'react';
import { act, render, renderHook } from '@testing-library/react';
import useBucketCount from '@hooks/useBucketCount';

const INITIAL_VALUE = 1;
const ERROR_MESSAGE = '에러';
const MAXIMUM_COUNT = 1000;

test('useBucketCounter의 초기값이 올바르게 작동하는 지 테스트', () => {
  const { result } = renderHook(() =>
    useBucketCount(INITIAL_VALUE, {
      errorMessage: ERROR_MESSAGE,
      maximumCount: MAXIMUM_COUNT,
      id: 1,
    })
  );

  expect(result.current.bucketCount).toBe(1);
});

test('increaseCount를 실행했을 때 bucketCount가 증가하는 지 확인하는 테스트', () => {
  const { result } = renderHook(() =>
    useBucketCount(INITIAL_VALUE, {
      errorMessage: ERROR_MESSAGE,
      maximumCount: MAXIMUM_COUNT,
      id: 1,
    })
  );

  act(() => {
    result.current.increaseCount();
  });

  expect(result.current.bucketCount).toBe(2);
});

test('decreaseCount 실행했을 때 bucketCount가 감소하는 지 확인하는 테스트', () => {
  const { result } = renderHook(() =>
    useBucketCount(INITIAL_VALUE, {
      errorMessage: ERROR_MESSAGE,
      maximumCount: MAXIMUM_COUNT,
      id: 1,
    })
  );

  act(() => {
    result.current.decreaseCount();
  });

  expect(result.current.bucketCount).toBe(0);
});

test('bucketCount가 maximumCount보다 큰 수라면 사용자에게 에러를 보여주는 지 확인하는 테스트', () => {
  const { result } = renderHook(() =>
    useBucketCount(MAXIMUM_COUNT, {
      errorMessage: ERROR_MESSAGE,
      maximumCount: MAXIMUM_COUNT,
      id: 1,
    })
  );

  render(<input ref={result.current.countRef} />);

  act(() => {
    result.current.increaseCount();
  });

  expect(result.current.bucketCount).toBe(MAXIMUM_COUNT + 1);
  expect(result.current.countRef.current?.validationMessage).toBe(
    ERROR_MESSAGE
  );

  act(() => {
    result.current.decreaseCount();
  });

  expect(result.current.bucketCount).toBe(MAXIMUM_COUNT);
  expect(result.current.countRef.current?.validationMessage).toBe('');
});
