import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addCartList } from 'actions/cart';
import { snackbar } from 'actions/snackbar';

import IconButton from 'components/@common/IconButton';
import { 아이콘_코드 } from 'constants/';

import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const ProductItem = ({ id, thumbnail, name, price }) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { items: cartList } = useSelector((state) => state.cart);

  const onClickAddCartButton = () => {
    dispatch(addCartList({ id, thumbnail, name, price }, cartList));
    dispatch(snackbar.pushMessageSnackbar(`${name}가 장바구니에 추가되었습니다 🧺`));
  };

  const onClickProduct = () => {
    navigator(`/product?id=${id}`);
  };

  return (
    <Styled.Container>
      <Styled.ImageWrapper onClick={onClickProduct}>
        <img src={thumbnail} alt="product thumbnail" />
      </Styled.ImageWrapper>
      <CommonStyled.FlexWrapper justifyContents="space-between">
        <Styled.Info onClick={onClickProduct}>
          <Styled.Title>{name}</Styled.Title>
          <p>{price.toLocaleString('ko-KR')}원</p>
        </Styled.Info>
        <CommonStyled.FlexWrapper width="auto">
          <IconButton onClick={onClickAddCartButton} icon={아이콘_코드.CART} />
        </CommonStyled.FlexWrapper>
      </CommonStyled.FlexWrapper>
    </Styled.Container>
  );
};

ProductItem.propTypes = {
  id: PropTypes.number.isRequired,
  thumbnail: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
};

ProductItem.defaultProps = {
  thumbnail: '기본 이미지 URL',
  name: '이름이 지정되지 않았습니다.',
  price: -1,
};

export default ProductItem;
