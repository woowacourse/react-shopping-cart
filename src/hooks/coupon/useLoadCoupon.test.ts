import { renderHook } from '@testing-library/react';
import useLoadCoupon from './useLoadCoupon';

describe('쿠폰 목록 불러오는 기능', () => {
  it('쿠폰 목록을 정상적으로 불러온다', () => {
    const { result } = renderHook(() => useLoadCoupon());
    expect(result.current.length).toEqual(4);
  });
});
