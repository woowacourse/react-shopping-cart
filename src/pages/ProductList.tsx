import { useRecoilState, useSetRecoilState } from 'recoil';
import * as Styled from './styles/ProductList.styles';
import { productListState } from '../atoms/ProductListState';
import { useEffect } from 'react';
import { getRequest } from '../api';
import {
  CartProductItem,
  ProductItem as ProductItemType,
} from '../types/productType';
import { ProductItem } from '../components/ProductItem';
import { cartState } from '../atoms/CartListState';

export const ProductList = () => {
  const [productList, setProductList] = useRecoilState(productListState);
  const setCartList = useSetRecoilState(cartState);

  useEffect(() => {
    const initProductListFromApi = async () => {
      const productList = await getRequest<ProductItemType[]>('products');
      const cartList = await getRequest<CartProductItem[]>('carts');

      setProductList(productList);
      setCartList(cartList);
    };

    initProductListFromApi();
  }, []);

  return (
    <Styled.Wrapper>
      {productList.map(({ id, name, price, imageUrl }) => (
        <ProductItem
          key={id}
          id={id}
          name={name}
          price={price}
          imageUrl={imageUrl}
        />
      ))}
    </Styled.Wrapper>
  );
};
