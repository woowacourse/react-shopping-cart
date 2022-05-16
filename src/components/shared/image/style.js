import styled from 'styled-components';

const Styled = {
  Image: styled.img`
    width: ${({ size }) => size || '282px'};
    height: ${({ size }) => size || '282px'};
  `,
};

export default Styled;
