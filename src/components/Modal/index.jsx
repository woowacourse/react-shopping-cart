import Styled from 'components/Modal/index.style';

const Modal = ({ children, ...rest }) => {
  return <Styled.Modal {...rest}>{children}</Styled.Modal>;
};

export default Modal;
