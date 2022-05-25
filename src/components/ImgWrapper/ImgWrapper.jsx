import * as Styled from './style';
import PropTypes from 'prop-types';

const ImgWrapper = ({ src, alt = '이미지', size }) => {
  return (
    <Styled.Wrapper>
      <Styled.Image src={src} alt={alt} size={size} />
    </Styled.Wrapper>
  );
};

ImgWrapper.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.number,
};

export default ImgWrapper;
