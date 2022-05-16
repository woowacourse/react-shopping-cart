import styled from 'styled-components';

const Divider = styled.div`
  width: 100%;
  height: ${({ height }) => height}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export default Divider;
