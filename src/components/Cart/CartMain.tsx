import SelectAllBox from '../SelectBox/SelectAllBox';
import CartList from './CartList';
import CartInfo from './CartInfo';
import CartFooter from './CartFooter';
import { SHIPPING_FEE_THRESHOLD } from '../../constants/cartConfig';

interface CartMainProps {
  checked: boolean;
  checkedItems: number[];
  setCheckedItems: React.Dispatch<React.SetStateAction<number[]>>;
  price: number;
  shippingFee: number;
  totalPrice: number;
  onChange: (checked: boolean) => void;
}

function CartMain({
  checked,
  checkedItems,
  setCheckedItems,
  price,
  shippingFee,
  totalPrice,
  onChange,
}: CartMainProps) {
  return (
    <>
      <SelectAllBox checked={checked} onChange={onChange} />
      <CartList checkedItems={checkedItems} setCheckedItems={setCheckedItems} />
      <CartInfo
        description={`총 주문 금액이 ${SHIPPING_FEE_THRESHOLD.toLocaleString()}원 이상일 경우 무료 배송됩니다.`}
      />
      <CartFooter price={price} shippingFee={shippingFee} totalPrice={totalPrice} />
    </>
  );
}

export default CartMain;
