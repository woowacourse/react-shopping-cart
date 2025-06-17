import { createContext, useContext } from 'react';
import { ModalPosition, ModalSizeType } from './Modal.types';

type ModalContextType = {
  onClose: () => void;
  position: ModalPosition;
  size: ModalSizeType;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};
