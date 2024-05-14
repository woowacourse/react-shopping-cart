import { selector, useSetRecoilState } from 'recoil';
import { itemDetailsState, itemsState } from './atoms';

export const totalPriceSelector = selector({
  key: 'totalPriceSelector',
  get: ({ get }) => {
    const productIds = get(itemsState);
    let total = 0;
    productIds.forEach((itemsState) => {
      const { quantity, price } = get(itemDetailsState(itemsState.id));
      total += quantity * price;
    });
    return total;
  },
});

// export const checkedBoxSelector = selector({
//   key: 'checkedBoxSelector',
//   set: ({ get, set }, isAllChecked: boolean) => {
//     const productIds = get(itemsState);
//     productIds.forEach((itemsState) => {
//       // 각 항목의 isChecked 상태를 업데이트합니다.
//       set(itemDetailsState(itemsState.id), (prevState) => ({
//         ...prevState,
//         isChecked: isAllChecked,
//       }));
//     });
//   },
// });

// export const checkedBoxSelector = selector({
//   key: 'checkedBoxSelector',
//   // 여기서는 get이 아니라 set을 정의해야 합니다.
//   // get 함수는 필요 없으므로 제거하거나 비워둘 수 있습니다.
//   set: ({get, set}, newValue) => {
//     // newValue로부터 isAllChecked 값을 얻습니다.
//     const isAllChecked = newValue instanceof DefaultValue ? false : newValue;
//     const productIds = get(itemsState); // 모든 상품 ID를 가져옵니다.
//     productIds.forEach((item) => {
//       // 각 항목의 isChecked 상태를 업데이트합니다.
//       set(itemDetailsState(item.id), (prevState) => ({
//         ...prevState,
//         isChecked: isAllChecked,
//       }));
//     });
//   },
// });
export const checkedBoxSelector = selector<boolean>({
  key: 'checkedBoxSelector',
  // 더미 get 함수 추가
  get: ({ get }) =>
    get(itemsState).reduce(
      (acc, item) => acc && get(itemDetailsState(item.id)).isChecked,
      true,
    ),
  set: ({ get, set }, newValue) => {
    const productIds = get(itemsState);
    productIds.forEach((item) => {
      set(itemDetailsState(item.id), (prevState) => ({
        ...prevState,
        isChecked: newValue,
      }));
    });
  },
});

// export const checkedBoxSelector = selector<boolean>({
//   key: 'checkedBoxSelector',
//   set: ({ get, set }, newValue) => {
//     // 여기서 newValue는 boolean 타입입니다.
//     const productIds = get(itemsState);
//     productIds.forEach(item => {
//       const setItemDetails = useSetRecoilState(itemDetailsState(item.id));
//       set(itemDetailsState(item.id), prevState => ({
//         ...prevState,
//         isChecked: newValue, // 여기서 newValue는 boolean
//       }));
//     });
//   },
// });
