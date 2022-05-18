import styled from 'styled-components';
import PropType from 'prop-types';

function ProductImage({ src, size }) {
  return <Styled.Image src={src} size={size} />;
}

ProductImage.propTypes = {
  src: PropType.string.isRequired,
  size: PropType.string,
};

ProductImage.defaultProps = {
  size: 'medium',
};

export default ProductImage;

const Styled = {
  Image: styled.img`
    ${({ size }) => {
      switch (size) {
        case 'small':
          return 'width: 144px; height:144px;';
        case 'large':
          return 'width: 570px; height:570px';
        case 'medium':
        default:
          return 'width: 282px; height:282px';
      }
    }}
  `,
};
