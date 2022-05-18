import React from 'react';
import Styled from './style';
import PropTypes from 'prop-types';

const CartContainer = ({ children }) => {
  return (
    <div>
      <Styled.ControlBar>
        <Styled.SelectFieldSet>
          <input type="checkbox" />
          <label>선택 해제</label>
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
