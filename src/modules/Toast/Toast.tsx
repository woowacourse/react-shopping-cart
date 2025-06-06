import { useEffect, useState } from "react";
import * as S from "./Toast.styles";
import { ToastVariant } from "./ToastProvider";
import { CheckIcon } from "@/components";

interface ToastProps {
  variant: ToastVariant;
  message: string;
  duration?: number;
}

export default function Toast({ variant, message, duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <S.ToastWrapper variant={variant} isVisible={isVisible}>
      <S.ToastIcon>
        <CheckIcon />
      </S.ToastIcon>
      <S.ToastMessage>{message}</S.ToastMessage>
      <S.ToastClose onClick={() => setIsVisible(false)}>&times;</S.ToastClose>
    </S.ToastWrapper>
  );
}
