import { Modal as ModalComponent } from './Modal';
import { ModalHeader } from './ModalHeader';
import { ModalTitle } from './ModalTitle';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import BaseButton from '../Button';
import CancelButton from './Button/CancelButton';
import ConfirmButton from './Button/ConfirmButton';

type ModalType = typeof ModalComponent & {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
  Title: typeof ModalTitle;
  Button: typeof BaseButton;
  ConfirmButton: typeof ConfirmButton;
  CancelButton: typeof CancelButton;
};

const Modal = ModalComponent as ModalType;

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Title = ModalTitle;
Modal.Button = BaseButton;
Modal.ConfirmButton = ConfirmButton;
Modal.CancelButton = CancelButton;

export { Modal };
