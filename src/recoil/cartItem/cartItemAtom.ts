import { atom, atomFamily } from 'recoil';

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const cartItemQuantityAtomFamily = atomFamily({
  key: 'cartItemQuantity',
  default: 0,
});

export const cartItemSelectedIdListAtom = atom<number[]>({
  key: 'cartItemSelectedIdList',
  default: [],
  effects: [localStorageEffect('cartItemSelectedIdList')],
});
