import React from 'react';
import ReactDOM from 'react-dom';

import * as Styled from 'components/common/Modal/Modal.style';

function Modal({ children, closeModal }) {
  const handleModalClose = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return ReactDOM.createPortal(
    <Styled.Root>
      <Styled.Container>{children}</Styled.Container>
      <Styled.Backdrop onClick={handleModalClose} />
    </Styled.Root>,
    document.querySelector('#root'),
  );
}

export default Modal;
