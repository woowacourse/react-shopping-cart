import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { addCartList } from 'actions/cart';

import IconButton from 'components/@common/IconButton';
import { ICON_CODE } from 'constants/';

import * as Styled from './styles';

const ProductItem = ({ id, image, name, price }) => {
  const dispatch = useDispatch();

  const onClickAddCartButton = () => {
    dispatch(addCartList({ id, image, name, price }));
    alert(`${name}가 장바구니에 추가되었습니다 🧺`);
  };

  return (
    <Styled.Container>
      <div className="image-wrapper">
        <img src={image} alt="product thumbnail" />
      </div>
      <div className="description">
        <div className="info">
          <p className="title">{name}</p>
          <p className="price">{price.toLocaleString('ko-KR')}원</p>
        </div>
        <div className="button-wrapper">
          <IconButton className="cart" onClick={onClickAddCartButton} icon={ICON_CODE.CART} />
        </div>
      </div>
    </Styled.Container>
  );
};

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
