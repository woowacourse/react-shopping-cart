import { renderHook } from '@testing-library/react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { productsState } from './atoms';

describe('cartItemCountState', () => {
  it('초기값을 잘 가져오는가', () => {
    const { result } = renderHook(() => useRecoilState(productsState), {
      wrapper: RecoilRoot,
    });

    console.log(result.current[0]);
    // expect(result.current[0]).toBe(0);
  });

  // it('값 변경 가능', () => {
  //   const { result } = renderHook(() => useRecoilState(cartItemCountState), {
  //     wrapper: RecoilRoot,
  //   });

  //   act(() => {
  //     result.current[1](2);
  //   });
  //   expect(result.current[0]).toBe(2);

  //   act(() => {
  //     result.current[1]((prevCount) => prevCount + 1);
  //   });
  //   expect(result.current[0]).toBe(3);
  // });
});
