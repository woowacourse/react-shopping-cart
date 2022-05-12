import styled from 'styled-components';

const StyledImage = styled.img`
  width: ${({ size }) => size || '282px'};
  height: ${({ size }) => size || '282px'};
`;

export default StyledImage;
