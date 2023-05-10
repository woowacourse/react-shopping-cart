import styled from 'styled-components';
import { ReactComponent as ShoppingCart } from '../../assets/icon/shopping-cart.svg';
import { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({
  product: { name, price, imageUrl },
}: ProductCardProps) => {
  return (
    <Styled.Container>
      <Styled.Img src={imageUrl} />
      <Styled.ProductDetail>
        <Styled.ProductInfo>
          <Styled.ProductName>{name}</Styled.ProductName>
          <Styled.ProductPrice>{price.toLocaleString()}원</Styled.ProductPrice>
        </Styled.ProductInfo>
        <ShoppingCart />
      </Styled.ProductDetail>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.li`
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 282px;
  `,

  Img: styled.img`
    width: 282px;
    height: 282px;

    cursor: pointer;
  `,

  ProductDetail: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  ProductInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    padding-left: 16px;
  `,

  ProductName: styled.span`
    font-weight: 400;
    font-size: 16px;

    letter-spacing: 0.5px;
  `,

  ProductPrice: styled.span`
    font-weight: 400;
    font-size: 20px;

    letter-spacing: 0.5px;
  `,
};
export default ProductCard;
