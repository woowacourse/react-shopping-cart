import React from 'react';
import * as Styled from './style';
import PropTypes from 'prop-types';

const CartContainer = ({ children }) => {
  return (
    <>
      <Styled.Title>
        댕냥 배송상품 ({React.Children.count(children)})
      </Styled.Title>
      <Styled.Container>{children}</Styled.Container>
    </>
  );
};

CartContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default CartContainer;
