import { useLoaderData, Await, Link } from 'react-router-dom';
import Header, { MainLogoButton } from '../../components/Header/Header';
import TitleContainer from '../../components/common/TitleContainer/TitleContainer';
import SubmitButton from '../../components/common/SubmitButton/SubmitButton';
import CartItemList from '../../components/ShoppingCart/CartItemList/CartItemList';
import TotalPriceContainer from '../../components/ShoppingCart/TotalPriceContainer/TotalPriceContainer';
import type { TCartItem } from '../../types/CartItem.type';
import { EmptyCart } from '../../assets';
import { PATHS } from '../../constants/PATHS';
import * as S from './ShoppingCartPage.style';
import useCartItems from '../../hooks/useCartItems';

function ShoppingCartPage() {
  const initialCartItemList = useLoaderData() as TCartItem[];

  const { cartItemList, selectedItemList, updateCartItemList } = useCartItems(initialCartItemList);

  const hasCartItemList = cartItemList.length !== 0;
  const hasSelectedCartItemList = selectedItemList.length !== 0;

  return (
    <div>
      <Header>
        <MainLogoButton />
      </Header>
      <Await resolve={cartItemList}>
        <S.Main>
          <TitleContainer
            title="장바구니"
            subTitle={cartItemList.length !== 0 ? `현재 ${cartItemList.length}종류의 상품이 담겨있습니다.` : ''}
          />
          {hasCartItemList ? (
            <>
              <CartItemList cartItemList={cartItemList} updateCartItemList={updateCartItemList} />
              <TotalPriceContainer />
            </>
          ) : (
            <S.CartEmptyContainer>
              <img src={EmptyCart} alt="빈 장바구니" />
              <p>장바구니에 담은 상품이 없습니다.</p>
            </S.CartEmptyContainer>
          )}
        </S.Main>
      </Await>
      {hasSelectedCartItemList ? (
        <Link to={PATHS.ORDER_CONFIRM}>
          <SubmitButton isActive={hasSelectedCartItemList} content="주문 확인" />
        </Link>
      ) : (
        <SubmitButton isActive={false} content="주문 확인" />
      )}
    </div>
  );
}

export default ShoppingCartPage;
