import StyledModal from 'components/shared/modal/style';

const Modal = ({ children, ...rest }) => {
  return <StyledModal {...rest}>{children}</StyledModal>;
};

export default Modal;
