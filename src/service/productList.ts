import { Product, ProductResponse } from '../types';
import customAxios from '../utils/API';

export const getProductList = async (): Promise<Product[] | undefined> => {
  const { data: productList } = await customAxios.get<ProductResponse[]>('/api/products');

  const appSchema = (productList: ProductResponse[]) =>
    productList.map((item) => ({
      id: String(item.product_id),
      price: item.price,
      name: item.name,
      image: item.image_url,
    }));

  return Promise.resolve(appSchema(productList));
};
