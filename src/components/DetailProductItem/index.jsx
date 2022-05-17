import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { addCartList } from 'actions/cart';
import { snackbar } from 'actions/snackbar';

import * as CommonStyled from 'components/@common/CommonStyle/styles';
import Button from 'components/@common/Button/styles';
import * as Styled from './styles';

const DetailProductItem = ({ id, image, name, price }) => {
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
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
};

DetailProductItem.defaultProps = {
  image: '기본 이미지 URL',
  name: '이름이 지정되지 않았습니다.',
  price: -1,
};

export default DetailProductItem;
