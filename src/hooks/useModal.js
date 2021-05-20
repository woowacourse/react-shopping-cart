import { useState } from 'react';
import PropTypes from 'prop-types';
import ModalComponent from '../components/Modal/Modal';

export default defaultValue => {
  const [isModalOpen, setModalState] = useState(defaultValue);

  const onClose = event => {
    if (event.target !== event.currentTarget) return;

    setModalState(false);
  };

  const open = () => {
    setModalState(true);
  };

  const close = () => {
    setModalState(false);
  };

  const toggle = () => {
    setModalState(state => !state);
  };

  const Modal = ({ children }) => isModalOpen && <ModalComponent onClose={onClose}>{children}</ModalComponent>;

  Modal.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return { isModalOpen, setModalState, onClose, Modal, open, close, toggle };
};
