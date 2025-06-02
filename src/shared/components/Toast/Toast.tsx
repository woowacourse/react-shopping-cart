import { ComponentProps } from 'react';
import { createPortal } from 'react-dom';

import { StyledModalContainer, StyledModalContent } from './Toast.styled';

export type ModalProps = {
  children: React.ReactNode;
} & ComponentProps<'div'>;

export const Toast = ({ children, ...props }: ModalProps) => {
  return createPortal(
    <StyledModalContainer>
      <StyledModalContent role="dialog" aria-modal="true" {...props}>
        {children}
      </StyledModalContent>
    </StyledModalContainer>,
    document.body
  );
};
