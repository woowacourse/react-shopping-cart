import styled from 'styled-components';
import PropTypes from 'prop-types';

const ImgWrapper = ({ src, alt }) => {
  return (
    <Styled.Wrapper>
      <Styled.Img src={src} alt={alt} />
    </Styled.Wrapper>
  );
};

ImgWrapper.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
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
    width: 60%;
  `,
};

export default ImgWrapper;
