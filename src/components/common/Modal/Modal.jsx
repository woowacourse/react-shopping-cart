import React from 'react';
import ReactDOM from 'react-dom';
import * as Styled from './Modal.style';

function Modal({ children, closeModal }) {
  const handleModalClose = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return ReactDOM.createPortal(
    <Styled.Dimmed onClick={handleModalClose}>
      <Styled.Container>{children}</Styled.Container>
    </Styled.Dimmed>,
    document.querySelector('#root'),
  );
}

export default Modal;
