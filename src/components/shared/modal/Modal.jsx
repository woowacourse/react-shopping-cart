import styled from 'styled-components';

const StyledModal = styled.div`
  position: absolute;
  border-radius: 25px;
  width: 250px;
  height: 50px;
  bottom: 90px;
  left: 18px;
  background-color: white;
  box-shadow: 0px 0px 4px rgb(0 0 0 / 20%);
`;

const Modal = ({ children, ...rest }) => {
  return <StyledModal {...rest}>{children}</StyledModal>;
};

export default Modal;
