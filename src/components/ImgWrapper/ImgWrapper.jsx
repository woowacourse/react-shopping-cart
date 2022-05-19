import styled from 'styled-components';
import PropTypes from 'prop-types';

const ImgWrapper = ({ src, alt, isMini = false }) => {
  return (
    <Styled.Wrapper>
      <Styled.Img src={src} alt={alt} isMini={isMini} />
    </Styled.Wrapper>
  );
};

ImgWrapper.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  isMini: PropTypes.bool,
};

const Styled = {
  Wrapper: styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Img: styled.img`
    ${({ isMini }) => `
      width: ${isMini ? '10%' : '60%'}; 
    `}
  `,
};

export default ImgWrapper;
