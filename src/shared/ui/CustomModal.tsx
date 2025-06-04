import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import * as S from './CustomModal.styles';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'center' | 'bottom';
  children: React.ReactNode;
}

export default function CustomModal({ isOpen, onClose, position = 'center', children }: CustomModalProps) {
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (isOpen) {
      document.body.classList.add('modal-open');
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleESC = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleESC);
    return () => document.removeEventListener('keydown', handleESC);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <S.Overlay position={position} onClick={onClose}>
      <S.ModalContainer position={position} onClick={(e) => e.stopPropagation()}>
        <main>{children}</main>
        <S.ModalFooterContainer>
          <S.CloseButton onClick={onClose}>닫기</S.CloseButton>
        </S.ModalFooterContainer>
      </S.ModalContainer>
    </S.Overlay>,
    document.body
  );
}
