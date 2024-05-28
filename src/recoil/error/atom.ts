import { atom } from 'recoil';

export const apiErrorState = atom<Error | null>({
  key: 'apiErrorState',
  default: null,
});
