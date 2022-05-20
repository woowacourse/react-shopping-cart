import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';

const ControllButton = ({ onClick, children }) => {
  return <StyledRoot onClick={onClick}>{children}</StyledRoot>;
};

const StyledRoot = styled.button`
  ${flexCenter}

  width: 42px;
  height: 30px;
  border: solid grey 1px;
  cursor: pointer;
`;

export default ControllButton;
