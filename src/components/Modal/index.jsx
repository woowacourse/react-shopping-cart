import React from 'react';

import { ModalStyled, ModalDimmerStyled } from './style';

function Modal({ onClick, children }) {
  return (
    <ModalDimmerStyled onClick={onClick}>
      <ModalStyled>{children}</ModalStyled>
    </ModalDimmerStyled>
  );
}

export default Modal;
