import PropTypes from 'prop-types';
import Styled from 'components/Image/index.style';

const Image = ({ src, alt, size, ...rest }) => {
  return <Styled.Image src={src} alt={alt} size={size} {...rest} />;
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  size: PropTypes.string,
};

Image.defaultProps = {
  size: '282px',
};

export default Image;
