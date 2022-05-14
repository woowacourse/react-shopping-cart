import styled from 'styled-components';

const Styled = {
  Wrapper: styled.div`
    width: ${({ size }) => (size ? `${size}px` : '100%')}
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Img: styled.img`
    width: 60%;
  `,
};

export default Styled;
