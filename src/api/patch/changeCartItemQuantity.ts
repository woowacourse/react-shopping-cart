import axiosInstance from '../../utils/axios';
import { URLS } from '../../constants/constants';

export interface QuantityParams {
  id: number;
  quantity: number;
}

const changeCartItemQuantity = async ({ id, quantity }: QuantityParams) => {
  await axiosInstance.patch(URLS.QUANTITY_TO_CHANGE(id), { quantity: quantity });
};

export default changeCartItemQuantity;
