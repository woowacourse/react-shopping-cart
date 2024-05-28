import { Await, Link, useLoaderData } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { EmptyCart } from '../../assets';
import SubmitButton from '../../components/Button/SubmitButton/SubmitButton';
import TitleContainer from '../../components/Container/TitleContainer/TitleContainer';
import TotalPriceContainer from '../../components/Container/TotalPriceContainer/TotalPriceContainer';
import Header from '../../components/Header/Header';
import CartItemList from '../../components/List/CartItemList/CartItemList';
import { PATHS } from '../../constants/PATHS';
import { selectedCartItemListState } from '../../recoil/CartItem/atoms/selectedCartItemListState';
import * as S from './ShoppingCartPage.style';

import type { CartItem } from '../../types/CartItem';
function ShoppingCartPage() {
  const cartItemList = useLoaderData() as CartItem[];

  const selectedItemList = useRecoilValue(selectedCartItemListState);

  const hasCartItemList = cartItemList.length !== 0;
  const hasSelectedCartItemList = selectedItemList.length !== 0;

  const renderCartItemListSection = () => (
    <>
      <CartItemList cartItemList={cartItemList} />

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
        <Link to={PATHS.ORDER_CONFIRM}>
          <SubmitButton isActive={true} content="주문 확인" />
        </Link>
      ) : (
        <SubmitButton isActive={false} content="주문 확인" />
      )}
    </div>
  );
}

export default ShoppingCartPage;
