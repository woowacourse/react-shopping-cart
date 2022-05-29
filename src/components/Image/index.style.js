import styled, { css } from 'styled-components';

const Styled = {
  Image: styled.img(
    ({ size }) => css`
      width: ${size};
      height: ${size};
    `,
  ),
};

export default Styled;
