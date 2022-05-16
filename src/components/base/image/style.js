import styled from 'styled-components';

const StyledImage = styled.img`
  width: ${({ width }) => width || '282px'};
  height: ${({ height }) => height || '282px'};
`;

export default StyledImage;
