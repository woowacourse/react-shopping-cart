// import { RecoilRoot, useRecoilState } from 'recoil';
// import { act, renderHook } from '@testing-library/react';

// import { itemQuantityState } from '../recoil/atoms';

// jest.mock('../apis/config', () => ({
//   API_CONFIG: {
//     API_URL: 'http://localhost:mock',
//   },
// }));

// describe('itemQuantityState', () => {
//   it('itemQuantityState의 초기값은 0이어야 한다.', () => {
//     const { result } = renderHook(() => useRecoilState(itemQuantityState(0)), {
//       wrapper: RecoilRoot,
//     });

//     const [itemQuantity] = result.current;

//     expect(itemQuantity).toBe(1);
//   });

//   it('itemQuantityState의 값은 setter에 의해 변경이 가능해야 한다.', () => {
//     const { result } = renderHook(() => useRecoilState(itemQuantityState(0)), {
//       wrapper: RecoilRoot,
//     });

//     const [itemQuantity, setItemQuantity] = result.current;
//     expect(itemQuantity).toBe(1);

//     act(() => {
//       setItemQuantity((prevQuantity) => prevQuantity + 1);
//     });

//     const [afterQuantity] = result.current;

//     expect(afterQuantity).toBe(2);
//   });
// });
