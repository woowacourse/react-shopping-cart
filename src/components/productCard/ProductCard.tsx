import styled from 'styled-components';
import { Product } from '../../types/Product';
import { Counter } from './Counter';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Style.Container>
      <Style.Image src={product.imageUrl} alt="상품 이미지" />
      <Style.DescriptionContainer>
        <Style.NamePriceContainer>
          <Style.Name>{product.name}</Style.Name>
          <Style.Price>{product.price}원</Style.Price>
        </Style.NamePriceContainer>
        <Counter removeItemFromCartList={() => {}} />
      </Style.DescriptionContainer>
    </Style.Container>
  );
};

const Style = {
  Container: styled.div`
    width: 283px;
    height: 358px;

    display: flex;
    flex-direction: column;
    gap: 18px;
  `,
  Image: styled.img`
    width: 283px;
    height: 283px;
  `,
  DescriptionContainer: styled.div`
    width: 283px;

    display: flex;
    justify-content: space-between;
  `,
  NamePriceContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Name: styled.span``,
  Price: styled.span``,
};
