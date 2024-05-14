import { useState } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import TitleContainer from '../../components/TitleContainer/TitleContainer';
import CartItem from '../../components/CartItem/CartItem';
import CheckButton from '../../components/Button/CheckButton/CheckButton';
import { TCartItem } from './ShoppingCartPage.type';
import { removeCartItems, fetchCartItems, updateCartItemQuantity } from '../../apis';
import * as S from './ShoppingCartPage.style';

function ShoppingCartPage() {
  const initialValue = useLoaderData() as TCartItem[];

  const [data, setData] = useState<TCartItem[]>(initialValue);

  const handleRemoveItem = async (cartItemId: number) => {
    const status = await removeCartItems(cartItemId);

    if (status === 204) {
      const data = await fetchCartItems();
      setData(data);
    }
  };

  const handleUpdateQuantity = async (cardItemId: number, quantity: number) => {
    const status = await updateCartItemQuantity(cardItemId, quantity);

    if (status === 200) {
      const data = await fetchCartItems();
      setData(data);
    }
  };

  return (
    <S.Layout>
      <Await resolve={data}>
        <TitleContainer title="장바구니" subTitle={`현재 ${data.length}종류의 상품이 담겨 있습니다.`} />
        <S.CartItems>
          <S.SelectAllButtonContainer>
            <CheckButton isChecked={false} />
            <p>전체 선택</p>
          </S.SelectAllButtonContainer>
          {data.map((el) => (
            <CartItem key={el.id} item={el} onRemoveItem={handleRemoveItem} onUpdateQuantity={handleUpdateQuantity} />
          ))}
        </S.CartItems>
      </Await>
    </S.Layout>
  );
}

export default ShoppingCartPage;
