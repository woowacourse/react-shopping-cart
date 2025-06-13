import SelectAllBox from '../SelectBox/SelectAllBox';
import CartList from './CartList';
import CartInfo from './CartInfo';
import CartFooter from './CartFooter';
import { SHIPPING_FEE_THRESHOLD } from '../../constants/cartConfig';
import { useCartSelection } from '../../hooks/useCartSelection';
import { useCartCalculations } from '../../hooks/useCartCalculations';

function CartMain() {
  const { isAllChecked: checked, checkAll: onChange, checkedItems } = useCartSelection();
  const { price, shippingFee, totalPrice } = useCartCalculations({ checkedIds: checkedItems });

  return (
    <>
      <SelectAllBox checked={checked} onChange={onChange} />
      <CartList />
      <CartInfo
        description={`총 주문 금액이 ${SHIPPING_FEE_THRESHOLD.toLocaleString()}원 이상일 경우 무료 배송됩니다.`}
      />
      <CartFooter price={price} shippingFee={shippingFee} totalPrice={totalPrice} />
    </>
  );
}

export default CartMain;
