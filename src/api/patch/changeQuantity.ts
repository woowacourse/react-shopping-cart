import axiosInstance from '../../utils/axios';
import { URL } from '../../constants/constants';

export interface QuantityParams {
  id: number;
  quantity: number;
}

const changeQuantity = async ({ id, quantity }: QuantityParams) => {
  await axiosInstance.patch(URL.QUANTITY_TO_CHANGE(id), { quantity: quantity });
};

export default changeQuantity;
