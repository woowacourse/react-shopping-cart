import { useState } from 'react';
import {
  StyledMessageWrapper,
  StyledModal,
  StyledModalBackdrop,
  StyledModalButton,
} from './ErrorAlertModal.styled';
import { CART_MESSAGES } from '../../constants/cart';

export const ErrorAlertModal: React.FC<{ errorMessage: string }> = ({
  errorMessage,
}) => {
  const [modalOpen, setModalOpen] = useState(true);
  return (
    <StyledModalBackdrop isOpen={modalOpen}>
      <StyledModal>
        <StyledMessageWrapper>
          <span>{errorMessage}</span>
          <span>{CART_MESSAGES.TRY_AGAIN}</span>
        </StyledMessageWrapper>
        <StyledModalButton onClick={() => setModalOpen(false)}>
          확인
        </StyledModalButton>
      </StyledModal>
    </StyledModalBackdrop>
  );
};
