import { Product } from '../../types';
import CheckBox from '../CheckBox';
import { useCheckCartIdsContext } from '../../contexts/CheckedCartIds/CheckedCartIdsContext';
import useCartActions from '../../hooks/useCartItemsActions';
import useCheckedCartActions from '../../hooks/useCheckedCartActions';
import S from './ItemCard.style';

type ItemCardProps = {
  id: number;
  product: Product;
  quantity: number;
};

const ItemCard = ({ id, product, quantity }: ItemCardProps) => {
  const { increaseCartItemQuantity, deleteCartItem, decreaseCartItemQuantity } =
    useCartActions();
  const { checkedCartIds } = useCheckCartIdsContext();
  const { addCheckedCartItem, removeCheckedCartItem } = useCheckedCartActions();

  const isChecked = checkedCartIds.includes(id);

  const handleClickDelete = (id: number) => {
    deleteCartItem(id);
    removeCheckedCartItem(id);
  };

  const handleClickDecrease = (id: number) => {
    if (quantity === 1) {
      handleClickDelete(id);
      return;
    }
    decreaseCartItemQuantity(id);
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
