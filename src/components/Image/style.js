import styled from 'styled-components';

const ImageStyled = styled.img(
  ({ width, height, cursor }) => `
  width: ${width};
  height: ${height};
  cursor: ${cursor};
`,
);

export default ImageStyled;
