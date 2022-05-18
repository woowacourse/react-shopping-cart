import React from 'react';
import Styled from './style';
import PropTypes from 'prop-types';
import CheckBox from 'components/CheckBox/CheckBox';

const CartContainer = ({ children }) => {
  return (
    <div>
      <Styled.ControlBar>
        <Styled.SelectFieldSet>
          <CheckBox id="total" />
          <span>전체 선택 / 해제</span>
        </Styled.SelectFieldSet>
        <Styled.DeleteButton>상품삭제</Styled.DeleteButton>
      </Styled.ControlBar>
      <Styled.Title>
        댕냥 배송상품 ({React.Children.count(children)})
      </Styled.Title>
      <Styled.Container>{children}</Styled.Container>
    </div>
  );
};

CartContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default CartContainer;
