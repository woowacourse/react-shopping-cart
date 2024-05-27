import { useRecoilValue } from 'recoil';
import { isCheckedState, productsState } from '../../../store/atoms';
import CheckoutItem from './CheckoutItem';

export default function CheckoutList() {
  const products = useRecoilValue(productsState);
  const isCheckedMap = useRecoilValue(isCheckedState);
  const checkoutProducts = products.filter((product) => isCheckedMap[product.id] === true);
  return (
    <div>
      {checkoutProducts.map((cartItem) => {
        return <CheckoutItem key={`checkout-${cartItem.id}`} cartItem={cartItem} />;
      })}
    </div>
  );
}
