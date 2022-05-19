import styled from 'styled-components';

const Divider = styled.div`
  width: ${({ width }) => (width ? width + 'px' : '100%')};
  height: ${({ height }) => height}px;
  margin: ${({ margin }) => (margin ? margin : '0')};
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export default Divider;
