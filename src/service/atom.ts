import { AtomEffect, atom } from 'recoil';

export type ModalType = {
  isOpen: boolean;
  callBack?: () => void;
};

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const localValue = localStorage.getItem(key);
    if (localValue) {
      setSelf(JSON.parse(localValue));
    }
    onSet((newValue, _, isReset) =>
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue)),
    );
  };

export const checkCartListState = atom<number[]>({
  key: 'checkCartList',
  default: [],
  effects: [localStorageEffect<number[]>('localCheckCart')],
});

export const deleteModalState = atom<ModalType>({
  key: 'deleteModal',
  default: {
    isOpen: false,
  },
});
