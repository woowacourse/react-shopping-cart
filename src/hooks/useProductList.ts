import { PRODUCT_LIST } from '@mockData/productList';

const useProductList = () => {
  const apiProduct = PRODUCT_LIST.productList;

  const productList = apiProduct.map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    };
  });

  return productList;
};

export default useProductList;
