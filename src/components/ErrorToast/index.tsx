import { TOAST_DURATION_TIME } from "./constants";
import * as S from "./ErrorToast.styled";
import { useEffect, useState } from "react";

interface ErrorToastProps {
  errorId?: string;
  message?: string;
  backgroundColor: string;
  onClose?: (id: string) => void;
}

function ErrorToast({ errorId, message, backgroundColor, onClose }: ErrorToastProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setIsOpen(true);

      const timer = setTimeout(() => {
        setIsOpen(false);

        if (errorId && onClose) {
          onClose(errorId);
        }
      }, TOAST_DURATION_TIME);

      return () => clearTimeout(timer);
    }
  }, [message, errorId, onClose]);

  const handleCloseClick = () => {
    setIsOpen(false);
    if (errorId && onClose) {
      onClose(errorId);
    }
  };

  if (!message) return null;

  return (
    <S.ErrorToastContainer backgroundColor={backgroundColor} isOpen={isOpen} onClick={handleCloseClick}>
      <p>{message}</p>
    </S.ErrorToastContainer>
  );
}

export default ErrorToast;
