import { atom } from 'recoil';

export const isMountainIslandAreaState = atom<boolean>({
  key: 'isMountainIslandAreaState',
  default: false,
});
