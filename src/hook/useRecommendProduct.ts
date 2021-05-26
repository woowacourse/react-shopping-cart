import { useEffect, useState } from 'react';
import { ProductDetailObjectType, ProductType } from '../type';

const useRecommendProduct = (
  products: ProductDetailObjectType,
  likedProducts: ProductDetailObjectType
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
  }, [likedProducts]);

  return { recommendedProductList };
};

export default useRecommendProduct;
