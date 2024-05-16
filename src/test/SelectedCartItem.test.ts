import { RecoilRoot, useRecoilState } from 'recoil';
import { renderHook } from '@testing-library/react';
import { SelectedCartItems } from '../recoil/selectedCardItems';
describe('SelectedCartItems', () => {
  jest.mock('../api/index.tsx', () => ({
    NODE_ENV: 'test',
    api: {
      apiUrl: 'http://localhost:mock',
    },
  }));
  it('초기 선택은 true', () => {
    const productId = 1;
    const { result } = renderHook(
      () => useRecoilState(SelectedCartItems(productId)),
      {
        wrapper: RecoilRoot,
      },
    );
    expect(result.current[0]).toBe(true);
  });
});
