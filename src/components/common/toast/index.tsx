import { ComponentProps } from 'react';
import { createPortal } from 'react-dom';

import { StyledModalContainer, StyledModalContent } from './Toast.styled';

export type ModalProps = {
  /**
   * The title of the modal
   */
  message: string;
} & ComponentProps<'div'>;

export const Toast = ({ message, ...props }: ModalProps) => {
  return createPortal(
    <StyledModalContainer data-testid="toast">
      <StyledModalContent role="dialog" aria-modal="true" {...props}>
        {message}
      </StyledModalContent>
    </StyledModalContainer>,
    document.body
  );
};
