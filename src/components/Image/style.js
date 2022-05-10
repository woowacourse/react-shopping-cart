import styled from 'styled-components';

const ImageStyled = styled.img(
  ({ size }) => `
  width: ${size};
  height: ${size};
`,
);

export default ImageStyled;
