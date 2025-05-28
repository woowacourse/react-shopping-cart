import styled from '@emotion/styled';
import { Product } from '../types';
import { useCartItemsContext } from '../contexts/CartItemsContext';
import CheckBox from './CheckBox';

type ItemCardProps = {
  id: number;
  product: Product;
  quantity: number;
};

const ItemCard = ({ id, product, quantity }: ItemCardProps) => {
  const {
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    deleteCartItem,
    checkedCartIds,
    addCheckedCartItem,
    removeCheckedCartItem,
  } = useCartItemsContext();

  const isChecked = checkedCartIds.includes(id);

  const handleCheckBoxClick = () => {
    if (isChecked) {
      removeCheckedCartItem(id);
      return;
    }

    addCheckedCartItem(id);
  };

  return (
    <S.Container data-testid="item-card">
      <S.ButtonBox>
        <CheckBox isChecked={isChecked} onClick={handleCheckBoxClick} />
        <button onClick={() => deleteCartItem(id)}>삭제</button>
      </S.ButtonBox>
      <S.ItemBox>
        <S.ItemImage src={product.imageUrl} alt="product-image" />
        <S.ItemInfoBox>
          <div>
            <S.ItemName>{product.name}</S.ItemName>
            <S.ItemPrice>{`${product.price.toLocaleString()}원`}</S.ItemPrice>
          </div>
          <S.Stepper>
            <button onClick={() => decreaseCartItemQuantity(id)}>-</button>
            <p>{quantity}</p>
            <button onClick={() => increaseCartItemQuantity(id)}>+</button>
          </S.Stepper>
        </S.ItemInfoBox>
      </S.ItemBox>
    </S.Container>
  );
};

export default ItemCard;

const S = {
  Container: styled.div`
    height: 160px;
  `,

  ButtonBox: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0;
  `,

  ItemBox: styled.div`
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
  `,
};
