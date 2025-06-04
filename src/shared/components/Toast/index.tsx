import { ComponentProps } from 'react';
import { createPortal } from 'react-dom';

import { StyledModalContainer, StyledModalContent } from './Toast.styled';

export type ModalProps = {
  /**
   * The message to be displayed in the toast.
   */
  message: string;
} & ComponentProps<'div'>;

export const Toast = ({ message, ...props }: ModalProps) => {
  return createPortal(
    <StyledModalContainer>
      <StyledModalContent role="dialog" aria-modal="true" {...props}>
        {message}
      </StyledModalContent>
    </StyledModalContainer>,
    document.body
  );
};
