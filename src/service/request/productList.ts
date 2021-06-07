import { Product, ProductResponse } from '../../types';
import customAxios from '../../utils/API';

export const requestProductList = async (): Promise<Product[] | undefined> => {
  const { data: productList } = await customAxios.get<ProductResponse[]>('/api/products');

  //TODO: 동적 타입 검사 어떻게 하지??
  const processedProductList = productList.map((item) => ({
    id: String(item.product_id),
    price: item.price,
    name: item.name,
    image: item.image_url,
  }));

  if (!isProductList(processedProductList)) {
    console.error('타입 체크 실패');
  }

  return Promise.resolve(processedProductList);
};

const isProductList = (productList: Array<Object>): productList is Product[] => {
  return productList.length === 0 || (productList as Product[])[0].id !== undefined;
};
