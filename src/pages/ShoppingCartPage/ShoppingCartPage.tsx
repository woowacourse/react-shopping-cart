import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useLoaderData, Await, Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import TitleContainer from '../../components/Container/TitleContainer/TitleContainer';
import SubmitButton from '../../components/Button/SubmitButton/SubmitButton';
import CartItemList from '../../components/List/CartItemList/CartItemList';
import TotalPriceContainer from '../../components/Container/TotalPriceContainer/TotalPriceContainer';
import type { CartItem } from '../../types/CartItem.type';
import { selectedCartItemListState } from '../../recoil/CartItem/atoms/selectedCartItemListState';
import { fetchCartItemList } from '../../apis';
import { EmptyCart } from '../../assets';
import { PATHS } from '../../constants/PATHS';
import * as S from './ShoppingCartPage.style';

function ShoppingCartPage() {
  const initialValue = useLoaderData() as CartItem[];

  const [cartItemList, setCartItemList] = useState<CartItem[]>(initialValue);

  const [selectedItemList, setSelectedItemList] = useRecoilState(selectedCartItemListState);

  const updateCartItemList = async () => {
    const newCartItemList = await fetchCartItemList();
    setCartItemList(newCartItemList);

    const newSelectedItemList = newCartItemList.filter((el) => selectedItemList.some((item) => el.id === item.id));
    setSelectedItemList(newSelectedItemList);
  };

  const hasCartItemList = cartItemList.length !== 0;
  const hasSelectedCartItemList = selectedItemList.length !== 0;

  const renderCartItemListSection = () => (
    <>
      <CartItemList cartItemList={cartItemList} updateCartItemList={updateCartItemList} />

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
      <Await resolve={cartItemList}>
        <S.Main>
          <TitleContainer
            title="장바구니"
            subTitle={cartItemList.length !== 0 ? `현재 ${cartItemList.length}종류의 상품이 담겨있습니다.` : ''}
          />
          {hasCartItemList ? renderCartItemListSection() : renderEmptyCartSection()}
        </S.Main>
      </Await>
      {hasSelectedCartItemList ? (
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
