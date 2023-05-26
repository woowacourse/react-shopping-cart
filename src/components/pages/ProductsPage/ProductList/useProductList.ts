import { useEffect, useState } from 'react';

import fetchApis from '@apis/fetchApis';
import { CartItemApi, Product } from '@customTypes/Product';

export const useProductList = () => {
  const [productList, setProductList] = useState<CartItemApi[]>([]);
  const [isGetProductListError, setIsGetProductListError] = useState(false);

  useEffect(() => {
    const { getData } = fetchApis();

    const combineProductsWithCartItems = (
      products: Product[],
      cartItems: CartItemApi[]
    ) => {
      const productList = products.map(product => {
        return (
          cartItems.find(cartItem => cartItem.product.id === product.id) ?? {
            id: null,
            quantity: 0,
            product: product,
          }
        );
      });

      return productList;
    };

    const getProducts = async () => {
      try {
        const products = await getData<Product[]>('/products');
        const cartItems = await getData<CartItemApi[]>('/cart-items');
        setProductList(combineProductsWithCartItems(products, cartItems));
      } catch (error) {
        setIsGetProductListError(true);
      }
    };

    getProducts();
  }, []);

  return { productList, isGetProductListError };
};
