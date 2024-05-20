import axiosInstance from '../../utils/axios';
import { API_URLS } from '../../constants/constants';
import useMutation from '../../hooks/useMutation';

export interface QuantityParams {
  id: number;
  quantity: number;
}

const useChangeCartItemQuantity = (cartListRefetch: () => Promise<void>) => {
  const changeCartItemQuantity = async ({ id, quantity }: QuantityParams) => {
    await axiosInstance.patch(API_URLS.QUANTITY_TO_CHANGE(id), { quantity: quantity });
    await cartListRefetch();
  };

  const { mutate, isPending, data, errorMessage } =
    useMutation<typeof changeCartItemQuantity>(changeCartItemQuantity);

  return {
    changeCartItemQuantity: mutate,
    isPending,
    data,
    errorMessage,
  };
};

export default useChangeCartItemQuantity;
