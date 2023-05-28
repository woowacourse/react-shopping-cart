import { useEffect, useState } from 'react';

import fetchApis from '@apis/fetchApis';
import { CartItem, Product } from '@customTypes/Product';
import useLocalStorage from '@hooks/useLocalStorage';

export const useProductList = () => {
  const [productList, setProductList] = useState<CartItem[]>([]);
  const [isGetProductListError, setIsGetProductListError] = useState(false);
  const { storedValue } = useLocalStorage('productList', []);

  useEffect(() => {
    const { getData } = fetchApis();

    const combineProductsWithCartItems = (
      products: Product[],
      cartItems: CartItem[]
    ) => {
      const productList = products.map(product => {
        return (
          cartItems.find(cartItem => cartItem.product.id === product.id) ?? {
            id: null,
            quantity: 0,
            product: product,
            isChecked: false,
          }
        );
      });

      return productList;
    };

    const getProducts = async () => {
      try {
        if (storedValue.length) {
          setProductList(storedValue);

          return;
        }

        const products = await getData<Product[]>('/products');
        const cartItems = await getData<CartItem[]>('/cart-items');
        setProductList(combineProductsWithCartItems(products, cartItems));
      } catch (error) {
        setIsGetProductListError(true);
      }
    };

    getProducts();
  }, []);

  return { productList, isGetProductListError };
};
