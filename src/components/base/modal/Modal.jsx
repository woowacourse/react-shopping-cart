import StyledModal from 'components/base/modal/style';

const Modal = ({ children, ...rest }) => {
  return <StyledModal {...rest}>{children}</StyledModal>;
};

export default Modal;
