import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import IconButton from 'components/@common/IconButton';
import CheckBox from 'components/@common/CheckBox';
import Counter from 'components/@common/Counter';

import { deleteCartItem } from 'actions/cart';
import { snackbar } from 'actions/snackbar';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import { 아이콘_코드 } from 'constants/';
import * as Styled from './styles';

const CartProducItem = ({ id, thumbnail, name, price, count, isChecked }) => {
  const dispatch = useDispatch();

  const onClickDeleteButton = () => {
    dispatch(deleteCartItem(id));
    dispatch(snackbar.pushMessageSnackbar(`${name}를 장바구니에서 삭제하였습니다 🧺`));
  };

  return (
    <Styled.Container>
      <CheckBox checkState={isChecked} />
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
          <Counter count={count} />
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
