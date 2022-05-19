import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponent as CartIcon } from 'assets/icon/Cart.svg';
import { CartButton, flexCenter, flexSpaceBetween } from 'components/common/Styled';
import { ROUTE } from 'constants';
import { COLOR } from 'constants';
import { StyledButton } from 'components/common/Button';

const Styled = {
  Wrapper: styled.div`
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
  `,
  Price: styled.p``,
  CartButton: styled(StyledButton)`
    :hover {
      svg path {
        fill: ${COLOR.CART_BUTTON_HOVER};
      }
    }
  `,
};

const Product = ({ id, thumbnail, name, price, onClick }) => {
  return (
    <Styled.Wrapper>
      <Link to={`${ROUTE.PRODUCT}${id}`}>
        <Styled.ThumbnailBox>
          <img src={thumbnail} alt="thumbnail" />
        </Styled.ThumbnailBox>
      </Link>

      <Styled.Content>
        <Link to={`${ROUTE.PRODUCT}${id}`}>
          <Styled.Description>
            <Styled.Name>{name}</Styled.Name>
            <Styled.Price>{price} 원</Styled.Price>
          </Styled.Description>
        </Link>
        <Styled.CartButton
          onClick={() => {
            onClick(id);
          }}
        >
          <CartIcon />
        </Styled.CartButton>
      </Styled.Content>
    </Styled.Wrapper>
  );
};

Product.propTypes = {
  id: PropTypes.number.isRequired,
  thumbnail: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

export default Product;
