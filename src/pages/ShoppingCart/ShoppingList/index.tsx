import ShoppingItem from '@Components/ShoppingItem';

import { Product, ShoppingCartProduct } from '@Types/index';

import useFetch from '@Hooks/useFetch';

import { FETCH_URL } from '@Constants/index';

import * as S from './style';

function ShoppingList() {
  const { data, status } = useFetch<ShoppingCartProduct[]>(FETCH_URL.cartItems);

  return (
    <S.Container>
      <S.ShoppingListLayout>
        {data && data.map((item) => <ShoppingItem cartId={item.id} product={item.product} key={item.product.id} />)}
      </S.ShoppingListLayout>
      <div></div>
    </S.Container>
  );
}

export default ShoppingList;
