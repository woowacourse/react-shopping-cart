import PropTypes from 'prop-types';

import HorizontalContent from './HorizontalContent';
import VerticalContent from './VerticalContent';

function ProductItem({
  direction = 'vertical',
  id,
  image,
  name,
  price,
  cartId,
  onClickCartButton,
}) {
  if (direction === 'vertical') {
    return <VerticalContent {...{ id, image, name, price, cartId, onClickCartButton }} />;
  }

  if (direction === 'horizontal') {
    return <HorizontalContent {...{ id, image, name, price }} />;
  }

  throw new Error('상품 목록 컴포넌트에 지원되지 않는 방향이 입력되었습니다');
}

ProductItem.defaultProps = {
  direction: 'vertical',
  image: '기본 이미지 URL',
  name: '이름이 지정되지 않았습니다.',
  price: -1,
  cartId: null,
};

ProductItem.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  cartId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ProductItem;
