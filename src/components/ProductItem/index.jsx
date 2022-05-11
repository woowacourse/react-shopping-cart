import PropTypes from 'prop-types';
import IconButton from 'components/@common/IconButton';

import { ICON_CODE } from 'constants/';

import * as Styled from './styles';

const ProductItem = ({ id, image, name, price }) => (
  <Styled.Container>
    <div className="image-wrapper">
      <img src={image} alt="product thumbnail" />
    </div>
    <div className="description">
      <div className="info">
        <p className="title">{name}</p>
        <p className="price">{price.toLocaleString('ko-KR')}원</p>
      </div>
      <IconButton className="cart" icon={ICON_CODE.CART} />
    </div>
  </Styled.Container>
);

ProductItem.propTypes = {
  id: PropTypes.number.isRequired,
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
