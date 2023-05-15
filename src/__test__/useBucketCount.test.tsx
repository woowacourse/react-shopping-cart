import React from 'react';
import { act, render, renderHook } from '@testing-library/react';
import useBucketCount from '@hooks/useBucketCount';

test('useBucketCounter의 초기값이 올바르게 작동하는 지 테스트', () => {
  const { result } = renderHook(() =>
    useBucketCount(1, {
      removeProductFromCart: () => {},
      errorMessage: '에러',
      maximumCount: 1000,
    })
  );

  expect(result.current.bucketCount).toBe(1);
});

test('increaseCount를 실행했을 때 bucketCount가 증가하는 지 확인하는 테스트', () => {
  const { result } = renderHook(() =>
    useBucketCount(1, {
      removeProductFromCart: () => {},
      errorMessage: '에러',
      maximumCount: 1000,
    })
  );

  act(() => {
    result.current.increaseCount();
  });

  expect(result.current.bucketCount).toBe(2);
});

test('decreaseCount 실행했을 때 bucketCount가 감소하는 지 확인하는 테스트', () => {
  const { result } = renderHook(() =>
    useBucketCount(1, {
      removeProductFromCart: () => {},
      errorMessage: '에러',
      maximumCount: 1000,
    })
  );

  act(() => {
    result.current.decreaseCount();
  });

  expect(result.current.bucketCount).toBe(0);
});

test('bucketCount가 maximumCount보다 큰 수라면 사용자에게 에러를 보여주는 지 확인하는 테스트', () => {
  const { result } = renderHook(() =>
    useBucketCount(1000, {
      removeProductFromCart: () => {},
      errorMessage: '에러',
      maximumCount: 1000,
    })
  );

  render(<input ref={result.current.countRef} />);

  act(() => {
    result.current.increaseCount();
  });

  expect(result.current.bucketCount).toBe(1001);
  expect(result.current.countRef.current?.validationMessage).toBe('에러');

  act(() => {
    result.current.decreaseCount();
  });

  expect(result.current.bucketCount).toBe(1000);
  expect(result.current.countRef.current?.validationMessage).toBe('');
});
