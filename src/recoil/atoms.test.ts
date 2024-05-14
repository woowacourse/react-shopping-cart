// import { renderHook, act } from "@testing-library/react";
// import { RecoilRoot, useRecoilState } from "recoil";
// import { cartSelectedState } from "./atoms";

// describe("cartSelectedState", () => {
//   it("초기값은 빈배열이다", () => {
//     const { result } = renderHook(() => useRecoilState(cartSelectedState), {
//       wrapper: RecoilRoot,
//     });
//     expect(result.current[0]).toEqual([]);
//   });

//   it("선택된 품목의 id 값이 배열에 추가된다", () => {
//     const { result } = renderHook(() => useRecoilState(cartSelectedState), {
//       wrapper: RecoilRoot,
//     });

//     act(() => {
//       result.current[1]([1, 2, 3]);
//     });
//     expect(result.current[0]).toEqual([1, 2, 3]);

//     act(() => {
//       result.current[1]((prevCount) => prevCount + 1);
//     });
//     expect(result.current[0]).toBe(3);
//   });
// });

// describe("cartQuantityAndPriceState", () => {
//   it("초기 수량은 0", () => {
//     const productId = 1;
//     const { result } = renderHook(() => useRecoilState(itemQuantityState(productId)), {
//       wrapper: RecoilRoot,
//     });
//     expect(result.current[0]).toBe(0);
//   });

//   it("수량 변경 가능", () => {
//     const productId = 1;
//     const { result } = renderHook(() => useRecoilState(itemQuantityState(productId)), {
//       wrapper: RecoilRoot,
//     });

//     act(() => {
//       result.current[1](2);
//     });
//     expect(result.current[0]).toBe(2);

//     act(() => {
//       result.current[1]((prevQuantity) => prevQuantity + 1);
//     });
//     expect(result.current[0]).toBe(3);
//   });
// });
