import { useState } from 'react';
import { useLoaderData, Await, Link } from 'react-router-dom';
import TitleContainer from '../../components/TitleContainer/TitleContainer';
import CartItem from '../../components/CartItem/CartItem';
import CheckButton from '../../components/Button/CheckButton/CheckButton';
import SubmitButton from '../../components/Button/SubmitButton/SubmitButton';
import TotalPriceContainer from '../../components/TotalPriceContainer/TotalPriceContainer';
import { TCartItem } from './ShoppingCartPage.type';
import { removeCartItems, fetchCartItems, updateCartItemQuantity } from '../../apis';
import { EmptyCart } from '../../assets';
import * as S from './ShoppingCartPage.style';
import { useRecoilState } from 'recoil';
import { selectedCartItemState } from '../../recoil/atoms/atoms';
import Header from '../../components/Header/Header';

function ShoppingCartPage() {
  const initialValue = useLoaderData() as TCartItem[];

  const [selectedItems, setSelectedItems] = useRecoilState(selectedCartItemState);

  const [data, setData] = useState<TCartItem[]>(initialValue);

  const isAllSelected = selectedItems.length === data.length;

  const isSubmitButtonActive = selectedItems.length !== 0;

  const handleRemoveItem = async (cartItemId: number) => {
    const status = await removeCartItems(cartItemId);

    if (status === 204) {
      const data = await fetchCartItems();
      setData(data);

      const newSelectedItems = data.filter((el) => selectedItems.some((item) => el.id === item.id));
      setSelectedItems(newSelectedItems);
    }
  };

  const handleUpdateQuantity = async (cardItemId: number, quantity: number) => {
    const status = await updateCartItemQuantity(cardItemId, quantity);

    if (status === 200) {
      const data = await fetchCartItems();
      setData(data);

      const newSelectedItems = data.filter((el) => selectedItems.some((item) => el.id === item.id));
      setSelectedItems(newSelectedItems);
    }
  };

  const handleAllSelect = () => {
    if (isAllSelected) setSelectedItems([]);
    else setSelectedItems(data);
  };

  return (
    <div>
      <Header />
      <S.Layout>
        <Await resolve={data}>
          <TitleContainer
            title="장바구니"
            subTitle={data.length !== 0 ? `현재 ${data.length}종류의 상품이 담겨 있습니다.` : ''}
          />
          {data.length !== 0 ? (
            <>
              <S.CartItems>
                <S.SelectAllButtonContainer>
                  <CheckButton isChecked={isAllSelected} onClick={handleAllSelect} />
                  <p>전체 선택</p>
                </S.SelectAllButtonContainer>
                {data.map((el) => (
                  <CartItem
                    key={el.id}
                    item={el}
                    onRemoveItem={handleRemoveItem}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                ))}
              </S.CartItems>
              <TotalPriceContainer />
            </>
          ) : (
            <S.CartEmptyContainer>
              <img src={EmptyCart} />
              <p>장바구니에 담은 상품이 없습니다.</p>
            </S.CartEmptyContainer>
          )}
        </Await>
      </S.Layout>
      {isSubmitButtonActive ? (
        <Link to="/confirm">
          <SubmitButton isActive={isSubmitButtonActive} content="주문 확인" />
        </Link>
      ) : (
        <SubmitButton isActive={isSubmitButtonActive} content="주문 확인" />
      )}
    </div>
  );
}

export default ShoppingCartPage;
