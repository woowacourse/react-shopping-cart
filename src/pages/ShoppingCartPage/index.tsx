import ShoppingCartSectionList from '../../components/ShoppingCart/ShoppingCartSectionList';
import ShoppingCartInnerContainer from '../../components/ShoppingCart/ShoppingCartInnerContainer';
import ShoppingCartResultSubmitCard from '../../components/ShoppingCart/ShoppingCartResultSubmitCard';
import ReactShoppingCartTemplate from '../../components/shared/ReactShoppingCartTemplate';
import useFetchCartRedux from '../../hooks/useFetchCartRedux';
import { useAppSelector } from '../../states/store';
import { useEffect } from 'react';

const TITLE = '장바구니';

const ShoppingCartPage = () => {
  useFetchCartRedux();

  const items = useAppSelector(({ cart }) => cart.items);

  const totalPrice: number = items.reduce((acc, { price, quantity }) => acc + price * quantity, 0);

  return (
    <ReactShoppingCartTemplate title={TITLE}>
      <ShoppingCartInnerContainer>
        <ShoppingCartSectionList />
        <ShoppingCartResultSubmitCard totalPrice={totalPrice} totalQuantity={items.length} />
      </ShoppingCartInnerContainer>
    </ReactShoppingCartTemplate>
  );
};

export default ShoppingCartPage;
