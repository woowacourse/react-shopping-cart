import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useLoaderData, Await, Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import TitleContainer from '../../components/common/TitleContainer/TitleContainer';
import SubmitButton from '../../components/common/SubmitButton/SubmitButton';
import CartItemList from '../../components/ShoppingCartPage/CartItemList/CartItemList';
import TotalPriceContainer from '../../components/common/TotalPriceContainer/TotalPriceContainer';
import type { TCartItem } from '../../types/CartItem.type';
import { selectedCartItemListState } from '../../recoil/CartItem/atoms/atoms';
import { fetchCartItemList } from '../../apis';
import { EmptyCart } from '../../assets';
import { PATHS } from '../../constants/PATHS';
import * as S from './ShoppingCartPage.style';

function ShoppingCartPage() {
  const initialValue = useLoaderData() as TCartItem[];

  const [cartItemList, setCartItemList] = useState<TCartItem[]>(initialValue);

  const [selectedItemList, setSelectedItemList] = useRecoilState(selectedCartItemListState);

  const updateCartItemList = async () => {
    const newCartItemList = await fetchCartItemList();
    setCartItemList(newCartItemList);

    const newSelectedItemList = newCartItemList.filter((el) => selectedItemList.some((item) => el.id === item.id));
    setSelectedItemList(newSelectedItemList);
  };

  const hasCartItemList = cartItemList.length !== 0;
  const hasSelectedCartItemList = selectedItemList.length !== 0;

  const renderCartItemList = () => {
    if (!hasCartItemList)
      return (
        <S.CartEmptyContainer>
          <img src={EmptyCart} alt="빈 장바구니" />
          <p>장바구니에 담은 상품이 없습니다.</p>
        </S.CartEmptyContainer>
      );

    return (
      <>
        <CartItemList cartItemList={cartItemList} updateCartItemList={updateCartItemList} />
        <TotalPriceContainer />
      </>
    );
  };

  const renderSubmitButton = () => {
    if (!hasSelectedCartItemList) return <SubmitButton isActive={false} content="주문 확인" />;

    return (
      <Link to={PATHS.ORDER_CONFIRM}>
        <SubmitButton isActive={hasSelectedCartItemList} content="주문 확인" />
      </Link>
    );
  };

  return (
    <div>
      <Header />
      <Await resolve={cartItemList}>
        <S.Main>
          <TitleContainer
            title="장바구니"
            subTitle={cartItemList.length !== 0 ? `현재 ${cartItemList.length}종류의 상품이 담겨있습니다.` : ''}
          />
          {renderCartItemList()}
        </S.Main>
      </Await>
      {renderSubmitButton()}
    </div>
  );
}

export default ShoppingCartPage;
