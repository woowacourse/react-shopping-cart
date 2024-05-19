import { useState } from 'react';
import {
  StyledMessageWrapper,
  StyledModal,
  StyledModalBackdrop,
  StyledModalButton,
} from './ErrorAlertModal.styled';

export const ErrorAlertModal: React.FC<{ errorMessage: string }> = ({
  errorMessage,
}) => {
  const [modalOpen, setModalOpen] = useState(true);
  return (
    <StyledModalBackdrop isOpen={modalOpen}>
      <StyledModal>
        <StyledMessageWrapper>
          <span>{errorMessage}</span>
          <span>잠시 후 다시 시도해주세요.</span>
        </StyledMessageWrapper>
        <StyledModalButton onClick={() => setModalOpen(false)}>
          확인
        </StyledModalButton>
      </StyledModal>
    </StyledModalBackdrop>
  );
};
