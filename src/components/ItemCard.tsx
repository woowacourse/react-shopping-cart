import styled from '@emotion/styled';
import { Product } from '../types';
import { useCartItemsContext } from '../contexts/CartItemsContext';
import CheckBox from './CheckBox';
import { useCheckedCartItemsContext } from '../contexts/CheckedCartItemContext';

type ItemCardProps = {
  id: number;
  product: Product;
  quantity: number;
};

const ItemCard = ({ id, product, quantity }: ItemCardProps) => {
  const { increaseCartItemQuantity, deleteCartItem: handleClickDelete } =
    useCartItemsContext();
  const { checkedCartIds, addCheckedCartItem, removeCheckedCartItem } =
    useCheckedCartItemsContext();

  const isChecked = checkedCartIds.includes(id);

  const handleClickDecrease = (id: number) => {
    if (quantity === 1) {
      handleClickDelete(id);
      return;
    }
  };

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
        <S.deleteButton onClick={() => handleClickDelete(id)}>
          삭제
        </S.deleteButton>
      </S.ButtonBox>
      <S.ItemBox>
        <S.ItemImage src={product.imageUrl} alt="product-image" />
        <S.ItemInfoBox>
          <div>
            <S.ItemName>{product.name}</S.ItemName>
            <S.ItemPrice>{`${product.price.toLocaleString()}원`}</S.ItemPrice>
          </div>
          <S.Stepper>
            <button onClick={() => handleClickDecrease(id)}>
              <img src="./minus-button.svg" alt="minus-button" />
            </button>
            <p>{quantity}</p>
            <button onClick={() => increaseCartItemQuantity(id)}>
              <img src="./plus-button.svg" alt="plus-button" />
            </button>
          </S.Stepper>
        </S.ItemInfoBox>
      </S.ItemBox>
    </S.Container>
  );
};

export default ItemCard;

const S = {
  Container: styled.div`
    border-top: 1px solid #e0e0e0;
    height: 160px;
    margin-bottom: 20px;
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

  deleteButton: styled.button`
    background-color: white;
    border: 2px solid #e6e6e6;
    border-radius: 8px;
    padding: 4px 8px;
  `,
};
