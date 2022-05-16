import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { addCartList } from 'actions/cart';

import Button from 'components/@common/Button';
import { ICON_CODE } from 'constants/';

import * as Styled from './styles';

function ProductItem({ id, image, name, price }) {
  const dispatch = useDispatch();

  const onClickAddCartButton = () => {
    dispatch(addCartList({ id, image, name, price }));
    alert(`${name}가 장바구니에 추가되었습니다 🧺`);
  };

  return (
    <Styled.Container>
      <Styled.ImageContainer>
        <Styled.Image src={image} alt="product thumbnail" />
      </Styled.ImageContainer>

      <Styled.Description>
        <Styled.ItemInfo>
          <Styled.Title>{name}</Styled.Title>
          <Styled.Price>{price.toLocaleString('ko-KR')}원</Styled.Price>
        </Styled.ItemInfo>

        <Styled.ButtonContainer>
          <Button className="cart" onClick={onClickAddCartButton} icon={ICON_CODE.CART} />
        </Styled.ButtonContainer>
      </Styled.Description>
    </Styled.Container>
  );
}

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
