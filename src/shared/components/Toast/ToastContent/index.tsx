import { useEffect, useState } from "react";
import { ToastType } from "../ToastService";
import * as S from "./ToastContent.styled";
import closeIcon from "@assets/icons/close.svg";
import successToastIcon from "@assets/icons/success-toast.svg";
import errorToastIcon from "@assets/icons/error-toast.svg";
import warningToastIcon from "@assets/icons/warning-toast.svg";
import infoToastIcon from "@assets/icons/info-toast.svg";

type ToastContentProps = {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
  onClose: (id: string) => void;
};

const ToastEffect = {
  success: {
    icon: successToastIcon,
    backGroundColor: "#07bc0c",
  },
  error: {
    icon: errorToastIcon,
    backGroundColor: "#e74c3c",
  },
  warning: {
    icon: warningToastIcon,
    backGroundColor: "#f1c40f",
  },
  info: {
    icon: infoToastIcon,
    backGroundColor: "#3498db",
  },
};

function ToastContent({
  id,
  type,
  message,
  duration,
  onClose,
}: ToastContentProps) {
  const [isUnmountDelayed, setIsUnmountDelayed] = useState(false);
  const closeAnimationDuration = 500;
  const delayTime = duration - closeAnimationDuration;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsUnmountDelayed(true);
    }, delayTime);

    return () => {
      clearTimeout(timer);
    };
  }, [delayTime]);

  const handleCloseButtonClick = (id: string) => {
    setIsUnmountDelayed(true);
    window.setTimeout(() => {
      onClose(id);
    }, closeAnimationDuration);
  };

  return (
    <>
      <S.Container isUnmountDelayed={isUnmountDelayed}>
        <S.CloseButton
          type="button"
          onClick={() => handleCloseButtonClick(id)}
          aria-label="닫기 버튼"
        >
          <S.CloseIcon src={closeIcon} alt="닫기 아이콘" />
        </S.CloseButton>
        <S.ContentBox>
          <S.ToastTypeIcon
            src={ToastEffect[type].icon}
            alt={`${type} 토스트 아이콘`}
          />
          <S.ToastContentMessage>{message}</S.ToastContentMessage>
        </S.ContentBox>
        <S.Progress>
          <S.ProgressBox toastColor={ToastEffect[type].backGroundColor}>
            <S.ProgressBar animationDuration={duration} />
          </S.ProgressBox>
        </S.Progress>
      </S.Container>
    </>
  );
}

export default ToastContent;
