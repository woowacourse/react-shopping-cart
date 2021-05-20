import { createPortal } from 'react-dom';

interface ModalPortalProps {
  children: React.ReactNode;
}

const ModalPortal = ({ children }: ModalPortalProps) => {
  const $modal = document.querySelector('#modal');
  return $modal ? createPortal(children, $modal) : null;
};

export default ModalPortal;
