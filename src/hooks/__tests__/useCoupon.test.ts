import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useCoupon from '../useCoupon';
import { server } from '../../mocks/node';
import { http, HttpResponse } from 'msw';
import mockCouponData from '../../mocks/mockCoupon.json';

describe('useCoupon', () => {
  it('API 호출에 성공하면 isLoading, error 상태와 함께 쿠폰 목록을 올바르게 반환해야 한다.', async () => {
    const { result } = renderHook(() => useCoupon());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.couponList).toEqual([]);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(result.current.couponList).toEqual(mockCouponData);
    });
  });

  it('API 호출에 실패하면 isLoading, error 상태를 올바르게 업데이트해야 한다.', async () => {
    server.use(
      http.get('/coupons', () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    const { result } = renderHook(() => useCoupon());

    await act(async () => null);

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeDefined();
    expect(result.current.couponList).toEqual([]);
  });
});
