import styled from 'styled-components';

const ImageStyled = styled.img(
  ({ width, height }) => `
  width: ${width}px;
  height: ${height}px;
`,
);

export default ImageStyled;
