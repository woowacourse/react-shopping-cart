import useCartService from '../../../hooks/useCartService';
import { useCheckedCartListValue } from '../../../provider/CheckedListProvider';

const usePaymentAmount = () => {
  const { cartList } = useCartService();
  const { checkedCartList } = useCheckedCartListValue();

  const paymentAmount = cartList
    .filter((cartItem) => checkedCartList.includes(cartItem.id))
    .reduce(
      (acc, cartItem) => acc + cartItem.product.price * cartItem.quantity,
      0,
    );

  const deliveryFee = checkedCartList.length ? 3000 : 0;

  return { paymentAmount, deliveryFee };
};

export default usePaymentAmount;
