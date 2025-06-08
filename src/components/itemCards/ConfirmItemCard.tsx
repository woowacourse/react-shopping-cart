import styled from '@emotion/styled';
import { Product } from '../../types';
import BaseS from './ItemCard.style';

type ConfirmItemCardProps = {
  product: Product;
  quantity: number;
};

const ConfirmItemCard = ({ product, quantity }: ConfirmItemCardProps) => {
  return (
    <S.Container data-testid="item-card">
      <S.ItemBox>
        <S.ItemImage src={product.imageUrl} alt="product-image" />
        <S.ItemInfoBox>
          <div>
            <S.ItemName>{product.name}</S.ItemName>
            <S.ItemPrice>{`${product.price.toLocaleString()}원`}</S.ItemPrice>
          </div>
          <div>{`${quantity} 개`}</div>
        </S.ItemInfoBox>
      </S.ItemBox>
    </S.Container>
  );
};

const S = {
  ...BaseS,
  Container: styled(BaseS.Container)`
    height: 120px;
  `,
};
export default ConfirmItemCard;
