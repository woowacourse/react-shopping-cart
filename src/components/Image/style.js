import styled from 'styled-components';

const ImageStyled = styled.img(
  ({ width = '140px', height = '140px', cursor }) => `
  width: ${width};
  height: ${height};
  cursor: ${cursor};
`,
);

export default ImageStyled;
