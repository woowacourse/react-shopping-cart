import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import Button from 'component/common/Button';

const ProductBox = styled.div`
  width: 282px;
  height: 358px;
  display: flex;
  flex-direction: column;
  gap: 18px;

  &:hover {
    text-decoration: underline;
  }
`;

const ProductImage = styled.img`
  width: 282px;
  height: 282px;
  object-fit: cover;
  cursor: pointer;
`;

const DescriptionBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
`;

const NameText = styled.p`
  font-family: 'Noto Sans KR';
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0.5px;
  color: #333333;
  cursor: pointer;
`;

const PriceText = styled.p`
  font-family: 'Noto Sans KR';
  font-weight: 400;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: #333333;
  cursor: pointer;
`;

const zoom = keyframes`
  from {
    width: 30px;
  }
  to{
    width: 35px;
  }
`;

const CartIcon = styled.img`
  width: 30px;
  border: none;

  &:hover {
    animation-duration: 0.3s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
    animation-name: ${zoom};
  }
`;

function Product({ handleProductClick, handleCartClick, image, name, price, id }) {
  const onProductClick = () => {
    handleProductClick(id);
  };

  return (
    <ProductBox>
      <ProductImage src={image} alt="과일 이미지" title="product-image" onClick={onProductClick} />
      <DescriptionBox>
        <div>
          <NameText onClick={onProductClick}>{name}</NameText>
          <PriceText>{price.toLocaleString('ko-KR')} 원</PriceText>
        </div>
        <Button onClick={handleCartClick}>
          <CartIcon src={`${process.env.PUBLIC_URL}/cart.svg`} />
        </Button>
      </DescriptionBox>
    </ProductBox>
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

export default Product;
