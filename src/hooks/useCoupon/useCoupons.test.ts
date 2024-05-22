import { renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { useCoupons } from './useCoupons';

describe('useCoupons', () => {
  it('쿠폰 목록을 올바르게 반환한다.', () => {
    const { result } = renderHook(() => useCoupons(), {
      wrapper: RecoilRoot,
    });

    expect(result.current.coupons).toBeDefined();
  });
});
