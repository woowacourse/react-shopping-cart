import PropTypes from 'prop-types';
import IconButton from 'components/@common/IconButton';

import { ICON_CODE } from 'constants/';

import Container from './styles';

const ProductItem = ({ id, image, name, price }) => (
  <Container>
    <img src={image} alt="product thumbnail" />
    <div>
      <div className="info">
        <p className="title">{name}</p>
        <p className="price">{price.toLocaleString('ko-KR')}원</p>
      </div>
      <IconButton className="cart" icon={ICON_CODE.CART} />
    </div>
  </Container>
);

ProductItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
};

ProductItem.defaultProps = {
  image: '기본 이미지 URL',
  name: '이름이 지정되지 않았습니다.',
  price: -1,
};

export default ProductItem;
