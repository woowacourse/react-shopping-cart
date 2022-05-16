import Styled from 'components/shared/modal/style';

const Modal = ({ children, ...rest }) => {
  return <Styled.Modal {...rest}>{children}</Styled.Modal>;
};

export default Modal;
