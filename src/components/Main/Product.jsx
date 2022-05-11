import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropType from 'prop-types';
import axios from 'axios';
import ProductImage from './ProductImage';
import { CART_SIZE, COLOR, SERVER_URL, PATH } from '../../constants';
import { ReactComponent as CartIcon } from '../shared/CartIcon.svg';
import { UnstyledButton } from '../shared/styles';

function Product({ id, src, price, title, isStored }) {
  const [isClicked, setIsClicked] = useState(isStored);

  const handleCartClick = async () => {
    try {
      await axios({
        url: isClicked
          ? `${SERVER_URL}${PATH.CARTS}/${id}`
          : `${SERVER_URL}${PATH.CARTS}`,
        data: isClicked ? null : { id, quantity: 1 },
        method: isClicked ? 'DELETE' : 'POST',
      });
    } catch (error) {
      alert(error);
    }
    setIsClicked((prev) => !prev);
  };

  useEffect(() => {
    setIsClicked(isStored);
  }, [isStored]);

  return (
    <div>
      <ProductImage src={src} />
      <Styled.ProductInfoContainer>
        <Styled.ProductInfoWrapper>
          <Styled.ProductName>{title}</Styled.ProductName>
          <Styled.ProductPrice>{`${price}원`}</Styled.ProductPrice>
        </Styled.ProductInfoWrapper>
        <Styled.CartButton onClick={handleCartClick}>
          <CartIcon
            width={CART_SIZE.SMALL.WIDTH}
            height={CART_SIZE.SMALL.HEIGHT}
            fill={isClicked ? COLOR.PRIMARY : COLOR.BLACK}
          />
        </Styled.CartButton>
      </Styled.ProductInfoContainer>
    </div>
  );
}

Product.propTypes = {
  id: PropType.string.isRequired,
  src: PropType.string.isRequired,
  title: PropType.string.isRequired,
  price: PropType.string.isRequired,
  isStored: PropType.bool.isRequired,
};

export default Product;

const Styled = {
  ProductInfoContainer: styled.div`
    display: flex;
    justify-content: space-between;
    width: 280px;
    padding: 5px;
    align-items: center;
  `,
  ProductInfoWrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
  ProductName: styled.span`
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
  `,
  ProductPrice: styled.span`
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
  `,
  CartButton: styled(UnstyledButton)`
    &:hover {
      opacity: 0.6;
    }
  `,
};
