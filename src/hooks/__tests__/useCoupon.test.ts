import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import useCoupon from '../useCoupon';
import { server } from '../../mocks/node';
import { http, HttpResponse } from 'msw';
import mockCouponData from '../../mocks/mockCoupon.json';

describe('useCoupon', () => {
  it('API 호출에 성공하면 쿠폰 목록을 반환해야 한다.', async () => {
    const { result } = renderHook(() => useCoupon());

    await waitFor(() => {
      expect(result.current.couponList).toEqual(mockCouponData);
    });
  });

  it('API 호출에 실패하면 빈 배열을 반환해야 한다.', async () => {
    server.use(
      http.get('/coupons', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const { result } = renderHook(() => useCoupon());

    expect(result.current.couponList).toEqual([]);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });
});
