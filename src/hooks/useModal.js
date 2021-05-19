import { useState } from 'react';
import PropTypes from 'prop-types';
import ModalComponent from '../components/Modal/Modal';

export default defaultValue => {
  const [isModalOpen, setModalOpen] = useState(defaultValue);

  const onClickClose = event => {
    if (event.target !== event.currentTarget) return;

    setModalOpen(false);
  };

  const Modal = ({ children }) =>
    isModalOpen && <ModalComponent onClickClose={onClickClose}>{children}</ModalComponent>;

  Modal.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return { isModalOpen, setModalOpen, onClickClose, Modal };
};
