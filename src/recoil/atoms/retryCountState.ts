import { atom } from 'recoil';

export const retryCountState = atom({
  key: 'retryCountState',
  default: 0,
});
