import styled from 'styled-components';

const LineStyled = styled.hr(
  ({ width, height, color }) => `
    width: ${width};
    background-color: ${color};
    height: ${height};
    margin: 0px;
  `,
);

export default LineStyled;
