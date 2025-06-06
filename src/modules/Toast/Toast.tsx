import { useEffect, useState } from "react";
import * as S from "./Toast.styles";
import { ToastVariant, useToast } from "./ToastProvider";
import { CheckIcon } from "@/components";

interface ToastProps {
  id: number;
  variant: ToastVariant;
  message: string;
  duration?: number;
}

export default function Toast({ id, variant, message, duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const { hideToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => hideToast(id), duration);
    return () => clearTimeout(timer);
  }, [duration, hideToast, id]);

  return (
    <S.Toast variant={variant} isVisible={isVisible}>
      <S.ToastIcon>
        <CheckIcon />
      </S.ToastIcon>
      <S.ToastMessage>{message}</S.ToastMessage>
      <S.ToastClose onClick={() => setIsVisible(false)}>&times;</S.ToastClose>
    </S.Toast>
  );
}
