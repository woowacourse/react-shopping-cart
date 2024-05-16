import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { removeCartItem } from '../../api';
import { itemDetailsState, itemsState } from '../../recoil/atoms';
import { Products } from '../../types/Product';
import { fetchCartItemQuantity } from '../../api';
import CheckBox from '../CheckBox/CheckBox';
import {
  UpdateLocalStorage,
  getLocalStorage,
} from '../../utils/UpdateLocalStorage';
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

const CardQuantityButton = styled.div`
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

const Button = styled.button`
  min-width: 2.4rem;
  min-height: 2.4rem;
  border: 1px solid gray;
  background-color: #ffffff;
  border-radius: 0.8rem;
  box-sizing: border-box;
  color: rgba(54, 54, 54, 1);
`;

interface ProductProps {
  product: Products;
}

function ProductCard({ product }: ProductProps) {
  const [details, setDetails] = useRecoilState(itemDetailsState(product.id));
  const setItems = useSetRecoilState(itemsState);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const localStorageList = getLocalStorage();
    const localStorageProduct = localStorageList.find(
      (value) => value.id === product.id,
    );
    setDetails({
      quantity: product.quantity,
      price: product.product.price,
      isChecked: localStorageProduct ? localStorageProduct.isChecked : true,
    });
  }, [product.quantity, product.product.price, setDetails, product.id]);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);

      try {
        await fetchCartItemQuantity(product.id, details.quantity);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchData();
  }, [details, product.id]);

  const handleDecreasedQuantity = () => {
    setDetails((prevQuantity) => ({
      ...prevQuantity,
      quantity: Math.max(prevQuantity.quantity - 1, 1),
    }));
  };

  const handleIncreasedQuantity = () => {
    setDetails((prevQuantity) => ({
      ...prevQuantity,
      quantity: prevQuantity.quantity + 1,
    }));
  };

  const handleRemoveItem = async (id: number) => {
    await removeCartItem(id);
    setItems((prevState) => prevState.filter((item) => item.id !== id));
  };

  const handleCheckedItem = () => {
    setDetails((prevState) => ({
      ...prevState,
      isChecked: !prevState.isChecked,
    }));

    UpdateLocalStorage({ id: product.id, isChecked: !details.isChecked });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <CardContainer>
      <CardHeader>
        <CheckBox isChecked={details.isChecked} onClick={handleCheckedItem} />
        <Button onClick={() => handleRemoveItem(product.id)}>
          {MESSAGES.delete}
        </Button>
      </CardHeader>

      <CardContent>
        <ItemImg src={product.product.imageUrl} alt={product.product.name} />
        <CardDetail>
          <CardInfo>
            <ProductName>{product.product.name}</ProductName>
            <ProductPrice>
              {product.product.price.toLocaleString()}원
            </ProductPrice>
          </CardInfo>
          <CardQuantityButton>
            <Button onClick={handleDecreasedQuantity}>-</Button>
            <QuantityCount>{details.quantity}</QuantityCount>
            <Button onClick={handleIncreasedQuantity}>+</Button>
          </CardQuantityButton>
        </CardDetail>
      </CardContent>
    </CardContainer>
  );
}

export default ProductCard;
