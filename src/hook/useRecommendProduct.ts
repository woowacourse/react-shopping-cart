import { useEffect, useState } from 'react';
import { ProductDetailType, ProductType } from '../type';

const useRecommendProduct = (
  products: {
    [key: string]: ProductDetailType;
  },
  likedProducts: {
    [key: string]: ProductDetailType;
  }
) => {
  const [recommendedProductList, setRecommendedProductList] = useState<
    Array<ProductType>
  >([]);

  useEffect(() => {
    const recommendProducts = (
      Object.values(likedProducts).length >= 3
        ? Object.values(likedProducts)
        : Object.values(products)
    ).map(
      ({ product_id, image_url, name, price }): ProductType => ({
        product_id,
        image_url,
        name,
        price,
      })
    );

    setRecommendedProductList(recommendProducts);
  }, []);

  return { likedProducts, recommendedProductList };
};

export default useRecommendProduct;
