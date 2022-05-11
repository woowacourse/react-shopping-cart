import styled from 'styled-components';

const StyledModal = styled.div`
  position: absolute;
  display: flex;
  border-radius: 25px;
  width: 180px;
  height: 50px;
  bottom: 90px;
  left: 45px;
  background-color: white;
  box-shadow: 0px 0px 4px rgb(0 0 0 / 20%);
  align-items: center;
  justify-content: space-around;
`;

const Modal = ({ children, ...rest }) => {
  return <StyledModal {...rest}>{children}</StyledModal>;
};

export default Modal;
