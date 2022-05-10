import styled from 'styled-components';
import PropTypes from 'prop-types';
import smallCart from '../../../assets/svg/smallCart.svg';

const ProductItem = ({ name, price, imgUrl }) => {
  return (
    <Styled.Wrapper>
      <Styled.ProductImage src={imgUrl} />
      <Styled.ProductDetail>
        <Styled.ProductInfo>
          <Styled.ProductName>{name}</Styled.ProductName>
          <Styled.ProductPrice>{price}원</Styled.ProductPrice>
        </Styled.ProductInfo>
        <Styled.CartButton>
          <Styled.CartSvg src={smallCart} />
        </Styled.CartButton>
      </Styled.ProductDetail>
    </Styled.Wrapper>
  );
};

ProductItem.propTypes = {
  name: PropTypes.string,
  price: PropTypes.string,
  imgUrl: PropTypes.string,
};

const Styled = {
  Wrapper: styled.div``,

  ProductImage: styled.img`
    max-width: 100%;
  `,

  ProductDetail: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px;
    width: 280px;
  `,

  ProductInfo: styled.div`
    display: flex;
    flex-direction: column;
  `,

  ProductName: styled.span`
    font-size: 16px;
  `,

  ProductPrice: styled.span`
    font-size: 20px;
  `,

  CartButton: styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
  `,

  CartSvg: styled.img`
    max-width: 100%;
  `,
};

export default ProductItem;
