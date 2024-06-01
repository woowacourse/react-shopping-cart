import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { cartListSelector } from '../src/recoil';
import cartListMockData from '../src/mocks/cartListMockData';

describe('cartListState 테스트', () => {
  it('API 호출로 불러온 장바구니 데이터가 정상적으로 저장된다.', async () => {
    const { result } = renderHook(() => useRecoilValue(cartListSelector), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      expect(result.current).toEqual(cartListMockData.content);
    });
  });
});
