import { atom } from 'recoil';

export type ModalType = {
  isOpen: boolean;
  callBack?: () => void;
};

export const checkCartListState = atom<number[]>({
  key: 'checkCartLists',
  default: [],
});

export const deleteModalState = atom<ModalType>({
  key: 'deleteModal',
  default: {
    isOpen: false,
  },
});
