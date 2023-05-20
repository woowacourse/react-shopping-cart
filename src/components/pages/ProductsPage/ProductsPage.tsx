import { StyledProductsPage } from '@pages/ProductsPage/ProductsPage.styled';
import ProductList from '@components/pages/ProductsPage/ProductList/ProductList';
import useFetch from '@hooks/useFetch';
import { useRecoilCallback } from 'recoil';
import { productIdsSelector, quantityListSelector } from '@recoil/selector';
import { useEffect } from 'react';

const ProductsPage = () => {
  const { postData, patchData } = useFetch('/cart-items');
  const handleProductsPageExit = useRecoilCallback(({ snapshot }) => () => {
    const productIds = snapshot.getLoadable(productIdsSelector).contents;
    const quantityList = snapshot.getLoadable(quantityListSelector).contents;

    updateCartApiData(productIds, quantityList);
  });

  const updateCartApiData = (productId: number[], quantityList: number[]) => {
    productId.forEach(async (productId, index) => {
      const url = await postData({ productId: productId });
      if (url) await patchData({ quantity: quantityList[index] }, url);
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
