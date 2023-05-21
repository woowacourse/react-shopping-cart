import { useRecoilState } from 'recoil';
import { toastState } from '../../../recoil/atoms';
import { ToastProps } from './Toast';
import { uuid } from '../../../utils/uuid';

const TOAST_DURATION = 2000;
const MAX_TOAST_COUNT = 3;

const useToast = () => {
  const [toastList, setToastList] = useRecoilState(toastState);

  const closeToast = (id: ToastProps['id']) => {
    setToastList((prev) => prev.filter((toast) => toast.id !== id));
  };

  const deactivateToast = (id: ToastProps['id']) => {
    setToastList((prev) =>
      prev.map((toast) => {
        if (toast.id !== id) return toast;

        return {
          ...toast,
          isActive: false,
        };
      }),
    );
  };

  const showToast = (
    status: ToastProps['status'],
    message: ToastProps['message'],
  ) => {
    const toastId = uuid();
    const newToast = { id: toastId, status, message, isActive: true };

    setToastList((prev) => {
      if (toastList.length >= MAX_TOAST_COUNT) {
        return [...prev.slice(1), newToast];
      }

      return [...prev, newToast];
    });

    setTimeout(() => deactivateToast(toastId), TOAST_DURATION);
  };

  return { toastList, showToast, deactivateToast, closeToast };
};
export default useToast;
