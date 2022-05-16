import styled from 'styled-components';

const ImageStyled = styled.img(
  ({ width, height, alt }) => `
  width: ${width};
  height: ${height};
  alt: ${alt};
`,
);

export default ImageStyled;
