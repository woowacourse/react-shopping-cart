import styled from 'styled-components';

const Divider = styled.div`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '4px'};
  margin: ${({ margin }) => margin || '0'};
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export default Divider;
