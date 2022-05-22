import React from 'react';
import PropTypes from 'prop-types';

import FlexContainer from 'components/@common/FlexContainer';
import Checkbox from 'components/@common/Checkbox';
import Counter from 'components/@common/Counter';
import Button from 'components/@common/Button';
import ToolTip from 'components/@common/ToolTip';
import ProductItem from 'components/ProductItem';

import { ICON_CODE } from 'constants/';
import * as S from './styles';

function CartItem({ id, image, name, price }) {
  return (
    <S.Container direction="row">
      <FlexContainer width="10%" justify="center">
        <Checkbox size="medium" />
      </FlexContainer>

      <FlexContainer width="70%">
        <ProductItem direction="horizontal" id={id} image={image} name={name} price={price} />
      </FlexContainer>

      <FlexContainer width="20%" justify="space-between" align="end">
        <ToolTip align="right" text="상품 삭제">
          <Button icon={ICON_CODE.TRASH_CAN} />
        </ToolTip>
        <Counter>0</Counter>
      </FlexContainer>
    </S.Container>
  );
}

CartItem.defaultProps = {
  image: '기본 이미지 URL',
  name: '이름이 지정되지 않았습니다.',
  price: -1,
};

CartItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CartItem;
