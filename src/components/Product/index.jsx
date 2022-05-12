import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CartButton } from 'components/common/Button';
import { ReactComponent as CartIcon } from 'assets/icon/Cart.svg';
import { flexCenter, flexSpaceBetween } from 'components/common/Styled';

const Styled = {
  Wrapper: styled(Link)`
    width: 282px;
    height: 358px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    box-shadow: 3px 3px 5px 0px #00000040;
  `,
  ThumbnailBox: styled(flexCenter)`
    height: 282px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  `,
  Content: styled(flexSpaceBetween)`
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

    margin: 0;
  `,
  Price: styled.p`
    margin: 0;
  `,
};

const Product = ({ id, thumbnail, name, price }) => {
  return (
    <Styled.Wrapper to={`/react-shopping-cart/product/${id}`}>
      <Styled.ThumbnailBox>
        <img src={thumbnail} alt="thumbnail" />
      </Styled.ThumbnailBox>
      <Styled.Content>
        <Styled.Description>
          <Styled.Name>{name}</Styled.Name>
          <Styled.Price>{price} 원</Styled.Price>
        </Styled.Description>
        <CartButton>
          <CartIcon />
        </CartButton>
      </Styled.Content>
    </Styled.Wrapper>
  );
};

Product.propTypes = {
  id: PropTypes.number.isRequired,
  thumbnail: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Product;
