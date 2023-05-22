import * as Styled from './ListPage.styles.tsx';
import ProductItem from '../../components/ProductListPage/ProductItem/ProductItem.tsx';
import type { CartItem, Product } from '../../types/index.ts';
import useGetData from '../../hooks/useGetData.ts';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { cartListAtom } from '../../stores/cartItemsStore.ts';

const ListPage = () => {
  const { data: products, getData: getProducts } = useGetData<Product[]>('/products');
  const { data: cartList, getData: getCartList } = useGetData<CartItem[]>('/cart-items');
  const setCartList = useSetRecoilState(cartListAtom);

  useEffect(() => {
    getProducts();
    getCartList();
  }, [getProducts, getCartList]);

  useEffect(() => {
    if (cartList) setCartList(cartList);
  }, [cartList, setCartList]);

  return (
    <Styled.ProductList>
      {products?.map((product) => {
        return <ProductItem key={product.id} {...product} />;
      })}
    </Styled.ProductList>
  );
};

export default ListPage;
