import { Pageable } from '../../type/pageable';
import axiosInstance from '../../utils/axios';
import { API_URLS } from '../../constants/constants';
import { Product } from '../../type/cartItem';

interface PaginationParams {
  page: number;
  size: number;
}

const getProducts = async (options: PaginationParams = { page: 0, size: 20 }) => {
  const response = await axiosInstance.get<Pageable<Product>>(API_URLS.PRODUCTS, {
    params: options,
  });

  return response.data.content;
};

export default getProducts;
