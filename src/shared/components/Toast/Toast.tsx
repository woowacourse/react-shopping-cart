import { useEffect, useState } from "react";
import { ToastInfo, ToastService } from "./ToastService";
import * as S from "./Toast.styled";
import ToastContent from "./ToastContent";

type ToastProps = {
  limit?: number; // 토스트 개수, 기본 값 3
  duration?: number; // 자동으로 토스트가 제거되는 시간, 기본 값 3000ms
};

function Toast({ limit = 3, duration = 3000 }: ToastProps) {
  const [toastInfos, setToastInfos] = useState<ToastInfo[]>([]);

  useEffect(() => {
    const addToast = ({ id, type, message }: ToastInfo) => {
      if (toastInfos.length >= limit) {
        return;
      }

      setToastInfos((prev) => [...prev, { id, type, message }]);

      window.setTimeout(() => {
        setToastInfos((prev) => prev.filter((toast) => toast.id !== id));
      }, duration);
    };

    const toastService = ToastService.getInstance();

    toastService.subscribe(addToast);

    return () => {
      toastService.unsubscribe(addToast);
    };
  }, [toastInfos.length, limit, duration]);

  const deleteToast = (id: string) => {
    setToastInfos((prev) => prev.filter((toastInfo) => toastInfo.id !== id));
  };

  return (
    <S.ToastContainer>
      {toastInfos.map(({ id, type, message }) => (
        <ToastContent
          key={id}
          id={id}
          duration={duration}
          type={type}
          message={message}
          onClose={deleteToast}
        />
      ))}
    </S.ToastContainer>
  );
}

export default Toast;
