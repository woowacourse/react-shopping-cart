import ShoppingItem from '@Components/ShoppingItem';

import { Product } from '@Types/index';

import useFetch from '@Hooks/useFetch';

import { PRODUCTS_URL } from '@Constants/index';

import * as S from './style';

function ShoppingList() {
  const { data, status } = useFetch<Product[]>(PRODUCTS_URL);
  return (
    <S.Container>
      <S.ShoppingListLayout>
        {data && data.map((product) => <ShoppingItem product={product} key={product.id} />)}
      </S.ShoppingListLayout>
      <div></div>
    </S.Container>
  );
}

export default ShoppingList;
