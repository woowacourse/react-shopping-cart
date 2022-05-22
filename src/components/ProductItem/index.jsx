import PropTypes from 'prop-types';

import VerticalContent from './VerticalContent';
import HorizontalContent from './HorizontalContent';

function ProductItem({ direction = 'vertical', id, image, name, price, onClickAddCart }) {
  switch (direction) {
    case 'vertical':
      return <VerticalContent {...{ id, image, name, price, onClickAddCart }} />;
    case 'horizontal':
      return <HorizontalContent {...{ id, image, name, price, onClickAddCart }} />;

    // no default
  }
}

ProductItem.defaultProps = {
  direction: 'vertical',
  image: '기본 이미지 URL',
  name: '이름이 지정되지 않았습니다.',
  price: -1,
};

ProductItem.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
};

export default ProductItem;
