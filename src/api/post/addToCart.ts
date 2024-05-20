import axiosInstance from '../../utils/axios';
import { API_URLS } from '../../constants/constants';
import useMutation from '../../hooks/useMutation';

const useAddToCart = () => {
  const addToCart = async (productId: number) => {
    try {
      await axiosInstance.post(API_URLS.CART_ITEMS, { productId: productId });
      alert(`${productId} 등록완료`);
    } catch (error) {
      alert('장바구니 등록 실패');
    }
  };

  const { mutate, isPending, data, errorMessage } = useMutation<typeof addToCart>(addToCart);

  return {
    addToCart: mutate,
    isPending,
    data,
    errorMessage,
  };
};

export default useAddToCart;
