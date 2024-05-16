// import { RecoilRoot, useRecoilState } from 'recoil';
// import { renderHook } from '@testing-library/react';
// import { CartItemsState } from '../recoil/cartItems';
// describe('SelectedCartItems', () => {
//   jest.mock('../api/index', () => ({
//     api: {
//       apiUrl: 'http://localhost:mock',
//     },
//   }));
//   it('초기 선택은 true', () => {
//     const { result } = renderHook(() => useRecoilState(CartItemsState), {
//       wrapper: RecoilRoot,
//     });
//     expect(result.current[0]).toBe(true);
//   });
// });
