import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { addCartList } from 'actions/cart';
import { snackbar } from 'actions/snackbar';

import IconButton from 'components/@common/IconButton';
import { ICON_CODE } from 'constants/';

import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

const ProductItem = ({ id, image, name, price }) => {
  const dispatch = useDispatch();

  const onClickAddCartButton = () => {
    dispatch(addCartList({ id, image, name, price }));
    dispatch(snackbar.pushMessageSnackbar(`${name}가 장바구니에 추가되었습니다 🧺`));
  };

  return (
    <Styled.Container>
      <Styled.ImageWrapper>
        <img src={image} alt="product thumbnail" />
      </Styled.ImageWrapper>
      <Styled.Description>
        <Styled.Info>
          <Styled.Title>{name}</Styled.Title>
          <p>{price.toLocaleString('ko-KR')}원</p>
        </Styled.Info>
        <CommonStyled.FlexWrapper>
          <IconButton onClick={onClickAddCartButton} icon={ICON_CODE.CART} />
        </CommonStyled.FlexWrapper>
      </Styled.Description>
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
