import { createPortal } from 'react-dom';

const ModalPortal = ({ children }) => {
  const $modal = document.querySelector('#modal');
  return createPortal(children, $modal);
};

export default ModalPortal;
