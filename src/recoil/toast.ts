import { ToastState } from 'components/@common/Toast/hooks/useToast';
import { atom } from 'recoil';

export const toastAtom = atom<ToastState[]>({
  key: 'toastAtom',
  default: [],
});
