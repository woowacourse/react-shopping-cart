import styled from '@emotion/styled';
import { Product } from '../types';

type ItemInfoCardProps = {
  product: Product;
  quantity: number;
};

const ItemInfoCard = ({ product, quantity }: ItemInfoCardProps) => {
  return (
    <S.Container data-testid="item-info-card">
      <S.ItemBox>
        <S.ItemImage src={product.imageUrl} alt="product-image" />
        <S.ItemInfoBox>
          <div>
            <S.ItemName>{product.name}</S.ItemName>
            <S.ItemPrice>{`${product.price.toLocaleString()}원`}</S.ItemPrice>
          </div>
          <S.Stepper>
            <p>{quantity}개</p>
          </S.Stepper>
        </S.ItemInfoBox>
      </S.ItemBox>
    </S.Container>
  );
};

export default ItemInfoCard;

const S = {
  Container: styled.div`
    border-top: 1px solid #e0e0e0;
    height: 120px;
    margin-bottom: 20px;
  `,

  ItemBox: styled.div`
    margin: 12px 0px;
    height: 112px;
    display: flex;
    align-items: center;
    gap: 24px;
  `,

  ItemImage: styled.img`
    width: 112px;
    height: 112px;
    object-fit: cover;
  `,

  ItemInfoBox: styled.div`
    height: 100%;
    padding: 10px 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,

  ItemName: styled.p`
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 4px;
  `,

  ItemPrice: styled.p`
    font-size: 24px;
    font-weight: 700;
  `,

  Stepper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
    width: 80px;
  `,
};
