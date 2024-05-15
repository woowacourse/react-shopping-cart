import { atomFamily } from 'recoil';

export const productQuantityState = atomFamily<number, number>({
  key: 'productQuantityState',
  default: 0,
});

export const isCheckedState = atomFamily<boolean, number>({
  key: 'isCheckedState',
  default: (id: number) => {
    const item = window.localStorage.getItem(JSON.stringify(id));
    return item ? JSON.parse(item) : true;
  },
});
