import styled from 'styled-components';

const Styled = {
  Image: styled.img(
    ({ size }) => `
    width: ${size || '282px'};
    height: ${size || '282px'};
  `,
  ),
};

export default Styled;
