import styled from 'styled-components';

const ImageStyled = styled.img(
  ({ width, height }) => `
  width: ${width};
  height: ${height};
`,
);

export default ImageStyled;
