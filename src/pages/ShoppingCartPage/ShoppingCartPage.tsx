import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useLoaderData, Await, Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import TitleContainer from '../../components/TitleContainer/TitleContainer';
import SubmitButton from '../../components/Button/SubmitButton/SubmitButton';
import CartItemList from '../../components/CartItemList/CartItemList';
import TotalPriceContainer from '../../components/TotalPriceContainer/TotalPriceContainer';
import type { TCartItem } from '../../types/CartItem.type';
import { fetchCartItems } from '../../apis';
import { selectedCartItemState } from '../../recoil/atoms/atoms';
import { EmptyCart } from '../../assets';
import { PATHS } from '../../constants/PATHS';
import * as S from './ShoppingCartPage.style';

function ShoppingCartPage() {
  const initialValue = useLoaderData() as TCartItem[];

  const [cartItems, setCartItems] = useState<TCartItem[]>(initialValue);

  const [selectedItems, setSelectedItems] = useRecoilState(selectedCartItemState);

  const updateCartItems = async () => {
    const newCartItems = await fetchCartItems();
    setCartItems(newCartItems);

    const newSelectedItems = newCartItems.filter((el) => selectedItems.some((item) => el.id === item.id));
    setSelectedItems(newSelectedItems);
  };

  const hasCartItems = cartItems.length !== 0;
  const hasSelectedCartItems = selectedItems.length !== 0;

  const renderCartItemsSection = () => (
    <>
      <CartItemList cartItems={cartItems} updateCartItems={updateCartItems} />
      <TotalPriceContainer />
    </>
  );

  const renderEmptyCartSection = () => (
    <S.CartEmptyContainer>
      <img src={EmptyCart} />
      <p>장바구니에 담은 상품이 없습니다.</p>
    </S.CartEmptyContainer>
  );

  return (
    <div>
      <Header />
      <Await resolve={cartItems}>
        <S.Layout>
          <TitleContainer
            title="장바구니"
            subTitle={cartItems.length !== 0 ? `현재 ${cartItems.length}종류의 상품이 담겨있습니다.` : ''}
          />
          {hasCartItems ? renderCartItemsSection() : renderEmptyCartSection()}
        </S.Layout>
      </Await>
      {hasSelectedCartItems ? (
        <Link to={PATHS.CONFIRM}>
          <SubmitButton isActive={true} content="주문 확인" />
        </Link>
      ) : (
        <SubmitButton isActive={false} content="주문 확인" />
      )}
    </div>
  );
}

export default ShoppingCartPage;
