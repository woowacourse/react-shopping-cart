import axios from 'axios';
import { Product, ProductResponse } from '../../types';

export const requestProductList = async (): Promise<Product[]> => {
  const { data: productList } = await axios.get<ProductResponse[]>('/api/products');

  const processedProductList: Product[] = productList.map((item) => ({
    id: item.product_id,
    price: item.price,
    name: item.name,
    image: item.image_url,
  }));

  return Promise.resolve(processedProductList);
};
