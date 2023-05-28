import { atom } from 'recoil';

const errorModalMessageState = atom<string | null>({
  key: 'errorModalMessage',
  default: null,
});

export { errorModalMessageState };
