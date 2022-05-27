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
    position: fixed;
    z-index: 100;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `,
  Img: styled.img`
    border-radius: 10px;
    ${({ isMini }) => `
      width: ${isMini ? '80px' : '500px'}; 
    `}
  `,
};

export default ImgWrapper;
