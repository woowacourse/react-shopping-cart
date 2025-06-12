import { useEffect, useRef, useState } from "react";
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
  const [isVisible, setIsVisible] = useState(false);
  const { hideToast } = useToast();
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    hideTimeoutRef.current = setTimeout(() => setIsVisible(false), duration);
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [duration, isVisible]);

  const handleAnimationEnd = () => {
    if (!isVisible) hideToast(id);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <S.Toast variant={variant} isVisible={isVisible} onTransitionEnd={handleAnimationEnd}>
      <S.ToastIcon>
        <CheckIcon />
      </S.ToastIcon>
      <S.ToastMessage>{message}</S.ToastMessage>
      <S.ToastClose onClick={handleClose}>&times;</S.ToastClose>
    </S.Toast>
  );
}
