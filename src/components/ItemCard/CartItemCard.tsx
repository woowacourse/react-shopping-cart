import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { removeCartItem } from '../../api';
import { itemDetailsState, itemsState } from '../../recoil/atoms';
import { CartItems } from '../../types/Item';
import { fetchCartItemQuantity } from '../../api';
import CheckBox from '../CheckBox/CheckBox';
import { updateLocalStorage } from '../../utils/LocalStorage';
import styled from 'styled-components';
import { MESSAGES } from '../../constants/Messages';

const CardContainer = styled.li`
  display: flex;
  flex-direction: column;
  padding: 1rem 0 0 0;
  gap: 1rem;
  border-color: rgba(0, 0, 0, 0.1);
  border-width: 0.5px 0 0 0;
  border-style: solid;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardContent = styled.div`
  display: flex;
  gap: 2.4rem;
`;

const ItemImg = styled.img`
  width: 11.2rem;
  height: 11.2rem;
`;

const CardDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin: 0.9rem 0;
  box-sizing: border-box;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
`;

const CardQuantityButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const ProductName = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.5rem;
`;

const ProductPrice = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 3.47rem;
`;

const QuantityCount = styled(ProductName)``;

const CountButton = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  border: 1px solid gray;
  background-color: #ffffff;
  border-radius: 0.8rem;
  box-sizing: border-box;
  color: rgba(54, 54, 54, 1);
  cursor: pointer;
`;

const DeleteButton = styled.button`
  width: 4rem;
  height: 2.4rem;
  border: 1px solid gray;
  background-color: #ffffff;
  border-radius: 0.8rem;
  box-sizing: border-box;
  color: rgba(54, 54, 54, 1);
  cursor: pointer;
`;

interface ProductProps {
  item: CartItems;
}

function CartItemCard({ item }: ProductProps) {
  const [details, setDetails] = useRecoilState(itemDetailsState(item.id));
  const setItems = useSetRecoilState(itemsState);
  const [error, setError] = useState(false);

  if (error) {
    throw new Error('error');
  }

  const handleDecreasedQuantity = async () => {
    setDetails((prevQuantity) => ({
      ...prevQuantity,
      quantity: Math.max(prevQuantity.quantity - 1, 1),
    }));
    try {
      await fetchCartItemQuantity(item.id, Math.max(details.quantity - 1, 1));
    } catch (error) {
      setError(true);
    }
  };

  const handleIncreasedQuantity = async () => {
    setDetails((prevQuantity) => ({
      ...prevQuantity,
      quantity: prevQuantity.quantity + 1,
    }));
    try {
      await fetchCartItemQuantity(item.id, details.quantity + 1);
    } catch (error) {
      setError(true);
    }
  };

  const handleRemoveItem = async (id: number) => {
    try {
      await removeCartItem(id);
      setItems((prevState) => prevState.filter((item) => item.id !== id));
    } catch (error) {
      setError(true);
    }
  };

  const handleCheckedItem = () => {
    setDetails((prevState) => ({
      ...prevState,
      isChecked: !prevState.isChecked,
    }));

    updateLocalStorage({ id: item.id, isChecked: !details.isChecked });
  };

  return (
    <CardContainer>
      <CardHeader>
        <CheckBox isChecked={details.isChecked} onClick={handleCheckedItem} />
        <DeleteButton onClick={() => handleRemoveItem(item.id)}>
          {MESSAGES.delete}
        </DeleteButton>
      </CardHeader>

      <CardContent>
        <ItemImg src={item.product.imageUrl} alt={`${item.product.name}사진`} />
        <CardDetail>
          <CardInfo>
            <ProductName>{item.product.name}</ProductName>
            <ProductPrice>{item.product.price.toLocaleString()}원</ProductPrice>
          </CardInfo>
          <CardQuantityButtonContainer>
            <CountButton onClick={handleDecreasedQuantity}>-</CountButton>
            <QuantityCount>{details.quantity}</QuantityCount>
            <CountButton onClick={handleIncreasedQuantity}>+</CountButton>
          </CardQuantityButtonContainer>
        </CardDetail>
      </CardContent>
    </CardContainer>
  );
}

export default CartItemCard;
