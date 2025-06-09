import { renderHook, waitFor } from '@testing-library/react';
import { ToastProvider } from '../../context/ToastContext';
import useCouponList from '../useCouponList';
import mockCoupon from '../../mocks/mockCoupon.json';
import { vi } from 'vitest';
import cart from '../../apis/cart';
import { ERROR_MESSAGE } from '../../constants/errorMessage';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>{children}</ToastProvider>
);

describe('useCouponList 훅 테스트', () => {
  it('초기 couponList의 상태 값은 목 데이터를 받아오고, isError의 상태 값은 "", isLoading의 상태 값은 false', async () => {
    const { result } = renderHook(() => useCouponList(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockCoupon);
    expect(result.current.error).toEqual('');
  });

  it('쿠폰 목록을 가져오는데 실패하면 error의 상태 값은 에러 메시지를 받아오고, isLoading의 상태 값은 false', async () => {
    vi.spyOn(cart, 'getCouponList').mockRejectedValueOnce(
      new Error('쿠폰 목록 가져오기 실패')
    );

    const { result } = renderHook(() => useCouponList(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toEqual(ERROR_MESSAGE.CART_LIST);
  });
});
