import axiosInstance from '../../utils/axios';
import { API_URLS } from '../../constants/constants';
import useMutation from '../../hooks/useMutation';

const useDeleteCartItem = (cartListRefetch: () => Promise<void>) => {
  const deleteCartItem = async (cartId: number) => {
    await axiosInstance.delete(API_URLS.DELETE_ITEMS(cartId));
    await cartListRefetch();
  };

  const { mutate, isPending, data, errorMessage } =
    useMutation<typeof deleteCartItem>(deleteCartItem);

  return {
    deleteCartItem: mutate,
    isPending,
    data,
    errorMessage,
  };
};

export default useDeleteCartItem;
