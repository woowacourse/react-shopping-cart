import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import IconButton from 'components/@common/IconButton';
import CheckBox from 'components/@common/CheckBox';
import Counter from 'components/@common/Counter';

import { deleteCartItem } from 'actions/cart';
import { snackbar } from 'actions/snackbar';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import { 아이콘_코드, 알림_메시지 } from 'constants/';
import * as Styled from './styles';

const CartProducItem = ({
  id,
  thumbnail,
  name,
  price,
  count,
  isChecked,
  handleChecked,
  handleItemCount,
}) => {
  const dispatch = useDispatch();

  const onClickDeleteButton = () => {
    if (isChecked(id)) {
      handleChecked(id);
    }

    dispatch(deleteCartItem([id]));
    dispatch(snackbar.pushMessageSnackbar(알림_메시지.장바구니_개별_삭제(name)));
  };

  return (
    <Styled.Container>
      <CheckBox checkState={isChecked(id)} handleChecked={() => handleChecked(id)} />
      <Styled.ImageWrapper>
        <img src={thumbnail} alt="product thumbnail" />
      </Styled.ImageWrapper>
      <CommonStyled.FlexWrapper
        height="100px"
        justifyContent="flex-end"
        alignItems="flex-end"
        flexDirection="column"
        padding="0 1rem"
      >
        <CommonStyled.FlexWrapper margin="0" width="100%" justifyContent="space-between">
          <Styled.Title>{name}</Styled.Title>
          <IconButton onClick={onClickDeleteButton} icon={아이콘_코드.DELETE} />
        </CommonStyled.FlexWrapper>
        <CommonStyled.FlexWrapper margin="0" width="120px" justifyContent="flex-end">
          <Counter id={id} count={count} handleItemCount={handleItemCount()} />
        </CommonStyled.FlexWrapper>
        <CommonStyled.FlexWrapper margin="0" width="100%" justifyContent="flex-end">
          <CommonStyled.Text padding="0.5rem 0">
            {price.toLocaleString('ko-KR')}원
          </CommonStyled.Text>
        </CommonStyled.FlexWrapper>
      </CommonStyled.FlexWrapper>
    </Styled.Container>
  );
};

CartProducItem.propTypes = {
  id: PropTypes.number.isRequired,
  thumbnail: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
};

CartProducItem.defaultProps = {
  thumbnail: '기본 이미지 URL',
  name: '이름이 지정되지 않았습니다.',
  price: -1,
};

export default CartProducItem;
