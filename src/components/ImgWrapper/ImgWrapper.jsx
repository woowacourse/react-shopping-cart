import Styled from './style';
import PropTypes from 'prop-types';

const ImgWrapper = ({ src, alt = '이미지' }) => {
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

export default ImgWrapper;
