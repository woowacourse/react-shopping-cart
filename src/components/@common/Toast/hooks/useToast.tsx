import { createPortal } from 'react-dom';
import { useRecoilState } from 'recoil';
import { toastAtom } from 'recoil/toast';
import * as S from '../Toast.styles';
import Toast from '..';

type ToastType = 'error' | 'success';
export interface ToastState {
  id: number;
  message: string;
  type: ToastType;
}

export const useToast = () => {
  const [toastItems, setToastItems] = useRecoilState<ToastState[]>(toastAtom);

  const showToast = (id: number, message: string, type: ToastType) => {
    setToastItems([...toastItems, { id: id, message: message, type: type }]);
  };

  const deleteToast = (id: number) => {
    const toastId = toastItems.findIndex((e) => e.id === id);
    if (toastId === -1) return;

    const newToastItems = [...toastItems];
    newToastItems.splice(toastId, 1);
    setToastItems(newToastItems);
  };

  const toast = {
    success: (message: string) =>
      showToast(Number(Date.now()), message, 'success'),
    error: (message: string) => showToast(Number(Date.now()), message, 'error'),
  };

  const renderToast = createPortal(
    <S.ToastContainer>
      {toastItems.map((toastItem) => (
        <Toast
          key={toastItem.id}
          id={toastItem.id}
          message={toastItem.message}
          type={toastItem.type}
        />
      ))}
    </S.ToastContainer>,
    document.getElementById('toast-container') as HTMLElement
  );

  return { toast, deleteToast, renderToast };
};
