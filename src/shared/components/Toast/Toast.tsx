import { ComponentProps } from 'react';
import { createPortal } from 'react-dom';

import { StyledModalContainer, StyledModalContent } from './Toast.styled';

export type ModalProps = {
  children: React.ReactNode;
  parent?: Element;
} & ComponentProps<'div'>;

export const Toast = ({ children, parent = document.body, ...props }: ModalProps) => {
  return createPortal(
    <StyledModalContainer>
      <StyledModalContent role="dialog" aria-modal="true" {...props}>
        {children}
      </StyledModalContent>
    </StyledModalContainer>,
    parent
  );
};
