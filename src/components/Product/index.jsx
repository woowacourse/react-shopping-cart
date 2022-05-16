import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponent as CartIcon } from 'assets/icon/Cart.svg';

import { CartButton } from 'components/common/Button';
import Flex from 'components/common/Flex';

const Product = ({ id, thumbnail, name, price }) => {
  return (
    <Styled.Wrapper to={`/react-shopping-cart/product/${id}`}>
      <Styled.ThumbnailBox>
        <Flex justify="center" align="center">
          <img src={thumbnail} alt="상품을 나타내는 대표 이미지" />
        </Flex>
      </Styled.ThumbnailBox>
      <Styled.Content>
        <Flex justify="space-between">
          <Styled.Description>
            <Styled.Name>{name}</Styled.Name>
            <Styled.Price>{price.toLocaleString()} 원</Styled.Price>
          </Styled.Description>
          <CartButton>
            <CartIcon />
          </CartButton>
        </Flex>
      </Styled.Content>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled(Link)`
    width: 282px;
    height: 358px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    box-shadow: 3px 3px 5px 0px #00000040;
  `,
  ThumbnailBox: styled.div`
    height: 282px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  `,
  Content: styled.div`
    padding: 0 10px;
    line-height: 22px;
    letter-spacing: 0.5px;
  `,
  Description: styled.div`
    width: 200px;
  `,
  Name: styled.p`
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  `,
  Price: styled.p``,
};

Product.propTypes = {
  id: PropTypes.number.isRequired,
  thumbnail: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Product;
