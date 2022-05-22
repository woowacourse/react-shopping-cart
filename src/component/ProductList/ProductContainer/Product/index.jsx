import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import Button from 'component/common/Button';

export default function Product({ handleProductClick, handleCartClick, product }) {
  const { image, name, price } = product;

  return (
    <Styled.Product>
      <Styled.ProductImage
        src={image}
        alt="과일 이미지"
        title="product-image"
        onClick={handleProductClick}
      />
      <Styled.DescriptionBox>
        <div>
          <Styled.NameText onClick={handleProductClick}>{name}</Styled.NameText>
          <Styled.PriceText onClick={handleProductClick}>
            {price.toLocaleString('ko-KR')} 원
          </Styled.PriceText>
        </div>
        <Button onClick={handleCartClick}>
          <Styled.CartIcon src={`${process.env.PUBLIC_URL}/cart.svg`} />
        </Button>
      </Styled.DescriptionBox>
    </Styled.Product>
  );
}

Product.defaultProps = {
  image: '',
  name: '과일',
  price: 0,
};

Product.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
};

const zoom = keyframes`
from {
  width: 30px;
}
to{
  width: 35px;
}
`;

const Styled = {
  Product: styled.div`
    width: 282px;
    height: 358px;
    display: flex;
    flex-direction: column;
    gap: 18px;

    &:hover {
      text-decoration: underline;
    }
  `,

  ProductImage: styled.img`
    width: 282px;
    height: 282px;
    object-fit: cover;
    cursor: pointer;
  `,

  DescriptionBox: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 12px;
  `,

  NameText: styled.p`
    font-family: 'Noto Sans KR';
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 0.5px;
    color: #333333;
    cursor: pointer;
  `,

  PriceText: styled.p`
    font-family: 'Noto Sans KR';
    font-weight: 400;
    font-size: 20px;
    letter-spacing: 0.5px;
    color: #333333;
    cursor: pointer;
  `,

  CartIcon: styled.img`
    width: 30px;
    border: none;

    &:hover {
      animation-duration: 0.3s;
      animation-timing-function: ease-out;
      animation-fill-mode: forwards;
      animation-name: ${zoom};
    }
  `,
};
