import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';

import useFetch from '@hooks/useFetch';

import { StyledProductsPage } from '@pages/ProductsPage/ProductsPage.styled';
import ProductList from '@components/pages/ProductsPage/ProductList/ProductList';
import { cartItemsState } from '@recoil/atom';
import { CartItem } from '@customTypes/Product';

const ProductsPage = () => {
  const { postData, patchData } = useFetch('/cart-items');
  const handleProductsPageExit = useRecoilCallback(({ snapshot }) => () => {
    const cartItems = Object.values<CartItem>(
      snapshot.getLoadable(cartItemsState).contents
    );

    // TODO: local storage에 담긴 cartItems과 비교하여, if(!변화) early return
    // TODO: local storage에 저장
    updateCartApiData(cartItems);
  });

  const updateCartApiData = (cartItems: CartItem[]) => {
    cartItems.forEach(async cartItem => {
      const url = await postData({ productId: cartItem.productId });
      if (!url) return;

      await patchData({ quantity: cartItem.quantity }, url);
    });
  };

  useEffect(() => {
    return () => {
      handleProductsPageExit();
    };
  }, [handleProductsPageExit]);

  return (
    <StyledProductsPage>
      <ProductList />
    </StyledProductsPage>
  );
};

export default ProductsPage;
