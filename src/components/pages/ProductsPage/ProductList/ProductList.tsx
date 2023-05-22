import { Suspense, useEffect, useState } from 'react';

import { Product } from '@customTypes/Product';
import useFetch from '@hooks/useFetch';

import { CartItemProps } from '@components/pages/CartPage/CartListSection/CartList/CartItem/CartItem';
import { StyledProductList } from '@components/pages/ProductsPage/ProductList/ProductList.styled';
import ProductItem from '@components/pages/ProductsPage/ProductList/ProductItem/ProductItem';
import ErrorModal from '@components/pages/ErrorPage/ErrorModal/ErrorModal';
import { FetchedDataList } from '@components/commons/FetchedDataList/FetchedDataList';

const ProductList = () => {
  const { getData } = useFetch('/cart-items');
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await getData<CartItemProps[]>();
      setCartItems(items);
    };

    fetchCartItems();
  }, [getData]);

  return (
    <FetchedDataList<Product[]> endpoint={'/products'} initialValue={[]}>
      {({ data, isError }) => {
        return (
          <Suspense>
            <ErrorModal isError={isError} />
            <StyledProductList>
              {data.map((item: Product) => {
                const productInCart = cartItems.find(
                  cartItem => cartItem.product.id === item.id
                );

                return (
                  <ProductItem
                    key={item.id}
                    initQuantity={productInCart ? productInCart.quantity : 0}
                    initUrl={
                      productInCart ? `/${productInCart.cartItemId}` : ''
                    }
                    product={{ ...item }}
                  />
                );
              })}
            </StyledProductList>
          </Suspense>
        );
      }}
    </FetchedDataList>
  );
};

export default ProductList;
