import { useEffect } from 'react';
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastItems.length > 0) {
        deleteToast(toastItems[0].id);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  });

  const renderToast = toastItems && (
    <S.ToastContainer>
      {toastItems.map((toastItem) => (
        <Toast
          key={toastItem.id}
          message={toastItem.message}
          type={toastItem.type}
        />
      ))}
    </S.ToastContainer>
  );

  return { toast, renderToast };
};
