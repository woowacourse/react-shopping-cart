import axiosInstance from '../../utils/axios';
import { API_URLS, ROUTER_URLS } from '../../constants/constants';
import useMutation from '../../hooks/useMutation';
import { useNavigate } from 'react-router-dom';
import { IPaymentInfo } from '../../recoil/selectors';

const useOrderItems = () => {
  const navigate = useNavigate();

  const orderItems = async (cartItemIds: number[], paymentInfo: IPaymentInfo) => {
    try {
      await axiosInstance.post(API_URLS.ORDERS, { cartItemIds });
      navigate(ROUTER_URLS.PAYMENT_INFO, { state: paymentInfo });
    } catch (error) {
      alert('결제 실패! 관리자에게 문의하세요.');
    }
  };

  const { mutate, isPending, data, errorMessage } = useMutation<typeof orderItems>(orderItems);

  return {
    orderItems: mutate,
    isPending,
    data,
    errorMessage,
  };
};

export default useOrderItems;
