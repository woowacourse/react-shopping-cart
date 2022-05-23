import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useCartItem } from 'hooks';

import { addCartList } from 'actions/cart';
import { snackbar } from 'actions/snackbar';

import { 알림_메시지 } from 'constants/';
import noImage from 'assets/no_image.png';

import * as CommonStyled from 'components/@common/CommonStyle/styles';
import Button from 'components/@common/Button/styles';
import * as Styled from './styles';

const DetailProductItem = ({ id, thumbnail, name, price }) => {
  const dispatch = useDispatch();
  const cartList = useCartItem();

  const onClickAddCartButton = () => {
    dispatch(addCartList({ id, thumbnail, name, price }, cartList));
    dispatch(snackbar.pushMessageSnackbar(알림_메시지.장바구니_추가(name)));
  };

  return (
    <Styled.Container>
      <Styled.ImageWrapper>
        <img src={thumbnail} alt="product thumbnail" />
      </Styled.ImageWrapper>
      <Styled.Description>
        <Styled.Info>
          <Styled.Title>{name}</Styled.Title>
          <CommonStyled.HR />
          <CommonStyled.FlexWrapper width="90%" justifyContent="space-between">
            <p>금액 </p>
            <p>{price.toLocaleString('ko-KR')}원</p>
          </CommonStyled.FlexWrapper>
        </Styled.Info>
        <Button onClick={onClickAddCartButton}>장바구니</Button>
      </Styled.Description>
    </Styled.Container>
  );
};

DetailProductItem.propTypes = {
  id: PropTypes.number.isRequired,
  thumbnail: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
};

DetailProductItem.defaultProps = {
  thumbnail: noImage,
  name: '이름이 지정되지 않았습니다.',
  price: -1,
};

export default DetailProductItem;
