import { atom } from 'recoil';
import { ToastProps } from '../../components/common/Toast/Toast';

export const toastState = atom<ToastProps[]>({
  key: 'toastState',
  default: [],
});
