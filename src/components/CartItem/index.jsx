import PropTypes from 'prop-types';
import React from 'react';

import { Button, Checkbox, Counter, FlexContainer, ToolTip } from 'components/@common';

import ProductItem from 'components/ProductItem';

import { ICON_CODE } from 'constants/';

import * as S from './styles';

function CartItem({
  id,
  image,
  name,
  price,
  quantity,
  isChecked,
  onChangeCheckBox,
  onChangeCounter,
  onClickRemove,
}) {
  const handleChangeCheckBox = () => {
    onChangeCheckBox(id, !isChecked);
  };

  const handleChangeCounter = (inputNumber) => {
    onChangeCounter(id, inputNumber);
  };

  const onClickRemoveButton = () => {
    onClickRemove(id);
  };

  return (
    <S.Container direction="row">
      <FlexContainer width="10%" justify="center">
        <Checkbox size="medium" checked={isChecked} onChange={handleChangeCheckBox} />
      </FlexContainer>

      <FlexContainer width="70%">
        <ProductItem direction="horizontal" id={id} image={image} name={name} price={price} />
      </FlexContainer>

      <FlexContainer width="20%" justify="space-between" align="end">
        <ToolTip align="right" text="상품 삭제">
          <Button icon={ICON_CODE.TRASH_CAN} onClick={onClickRemoveButton} />
        </ToolTip>
        <Counter count={quantity} onChange={handleChangeCounter} />
      </FlexContainer>
    </S.Container>
  );
}

CartItem.defaultProps = {
  image: '기본 이미지 URL',
  name: '이름이 지정되지 않았습니다.',
  price: -1,
  quantity: 1,
  isChecked: false,
  onChangeCheckBox: () => {},
  onChangeCounter: () => {},
  onClickRemove: () => {},
};

CartItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isChecked: PropTypes.bool,
  onChangeCheckBox: PropTypes.func,
  onChangeCounter: PropTypes.func,
  onClickRemove: PropTypes.func,
};

export default CartItem;
