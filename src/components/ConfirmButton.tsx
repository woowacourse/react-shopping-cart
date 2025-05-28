import { useCartItemsContext } from '../contexts/CartItemsContext';

const ConfirmButton = () => {
  const { checkedCartIds } = useCartItemsContext();
  const isDisabled = checkedCartIds.length === 0;

  return <button disabled={isDisabled}>주문 확인</button>;
};

export default ConfirmButton;
