import useSWR from 'swr';
import { useEffect, useState } from 'react';

import { requestGet, deepCamelize, requestPost, requestDelete } from '../utils';
import { BASE_URL, DEFAULT_CUSTOMER_NAME } from '../constants';
import { getFormattedAsKRW, deepDecamelize } from '../utils';

const getProducts = async (url) => {
  const response = await requestGet({ url });

  if (response.status !== 200) {
    throw new Error(response);
  }
  const body = await response.json();
  return deepCamelize(body);
};

export const useCart = (customerName = DEFAULT_CUSTOMER_NAME) => {
  const { data, error, mutate } = useSWR(
    `${BASE_URL}/customers/${customerName}/carts`,
    getProducts
  );
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(() =>
      data?.reduce((acc, cur) => {
        const targetItem = acc.find((item) => item.productId === cur.productId);

        if (targetItem) {
          targetItem.cartIds.push(cur.cartId);
          return acc;
        }

        acc.push({ ...cur, cartIds: [cur.cartId], isSelected: true });
        return acc;
      }, [])
    );
  }, [data]);

  const selectedProducts = products?.filter((product) => product.isSelected);

  const totalPrice = selectedProducts?.reduce((acc, cur) => {
    const unitPrice = cur.price;
    const quantity = cur.cartIds.length;

    return (acc += unitPrice * quantity);
  }, 0);

  const addProduct = async (productId) => {
    const response = await requestPost({
      url: `${BASE_URL}/customers/${customerName}/carts`,
      body: deepDecamelize({ productId }),
    });

    if (response.status !== 201) {
      throw new Error(response);
    }
    mutate();
  };

  const removeCartItem = async (cartId) => {
    const response = await requestDelete({
      url: `${BASE_URL}/customers/${customerName}/carts/${cartId}`,
    });

    if (response.status !== 204) {
      throw new Error(response);
    }
    mutate();
  };

  const removeProduct = async (productId) => {
    const cartIds = products.find((product) => product.productId === productId).cartIds;

    for (const cartId of cartIds) {
      removeCartItem(cartId);
    }
  };

  const removeProducts = async () => {
    const productIds = products
      .filter((product) => product.isSelected)
      .map((product) => product.productId);

    productIds.forEach((productId) => removeProduct(productId));
  };

  const increment = (productId) => {
    addProduct(productId);
  };

  const decrement = (productId) => {
    const targetCartId = products
      .find((product) => product.productId === productId)
      .cartIds.slice(-1)[0];

    removeCartItem(targetCartId);
  };

  const changeQuantity = (productId, nextQuantity) => {
    const targetProduct = products.find((product) => product.productId === productId);
    const prevQuantity = targetProduct.cartIds.length;
    const diff = Math.abs(nextQuantity - prevQuantity);

    if (diff === 0) {
      return;
    }

    const func = nextQuantity > prevQuantity ? increment : decrement;

    for (let i = 0; i < diff; i++) {
      func(productId);
    }
  };

  const toggleProduct = (productId) => {
    setProducts((prevState) => {
      const nextState = [...prevState];
      const targetItem = nextState.find((product) => product.productId === productId);
      targetItem.isSelected = !targetItem.isSelected;

      return nextState;
    });
  };

  const toggleAll = (willBeSelected) => {
    setProducts((prevState) =>
      prevState.reduce((acc, cur) => {
        cur.isSelected = willBeSelected;
        return [...acc, cur];
      }, [])
    );
  };

  return {
    products,
    isLoading: !error && !products,
    isError: error,
    mutate,
    selectedProducts,
    totalPrice: getFormattedAsKRW(totalPrice),
    increment,
    decrement,
    changeQuantity,
    addProduct,
    removeProduct,
    removeProducts,
    toggleProduct,
    toggleAll,
  };
};
