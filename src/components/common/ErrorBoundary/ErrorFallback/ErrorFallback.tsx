import { HTTP_ERROR_MESSAGE } from '@constants/http';
import { Modal } from '@jinyyy/simple-modal';
import { useState } from 'react';

import * as Styled from './ErrorFallback.styled';

export const hasKeyInObject = <T extends object>(obj: T, key: string | number | symbol): key is keyof T => {
  return key in obj;
};

export interface ErrorProps {
  statusCode: number;
  onResetError?: () => void;
}

const ErrorFallbackModalContentStyle = { height: 'initial' };

const ErrorFallback = ({ statusCode, onResetError }: ErrorProps) => {
  const isHTTPError = hasKeyInObject(HTTP_ERROR_MESSAGE, statusCode);

  const [isOpen, setIsOpen] = useState(true);

  const handleCloseButton = () => {
    setIsOpen((prev) => !prev);

    if (onResetError) onResetError();
  };

  if (!isHTTPError) return null;

  return (
    <Modal position="center" isOpen={isOpen} onToggle={handleCloseButton}>
      <Modal.ModalContent style={ErrorFallbackModalContentStyle}>
        <Styled.ErrorFallbackTitle>{HTTP_ERROR_MESSAGE[statusCode].body}</Styled.ErrorFallbackTitle>
      </Modal.ModalContent>
      <Modal.ModalFooter direction="row">
        <Modal.ModalButton color="primary" onClick={onResetError}>
          {HTTP_ERROR_MESSAGE[statusCode].button}
        </Modal.ModalButton>
      </Modal.ModalFooter>
    </Modal>
  );
};

export default ErrorFallback;
