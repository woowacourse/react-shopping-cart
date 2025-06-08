import SelectAllBox from '../SelectBox/SelectAllBox';
import CartList from './CartList';
import CartFooter from './CartFooter';
import styled from '@emotion/styled';
import { infoIcon } from '../../assets';
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

      <CartInfo>
        <InfoIconImage src={infoIcon} alt="infoIcon" />
        <p>
          총 주문 금액이 {SHIPPING_FEE_THRESHOLD.toLocaleString()}원 이상일 경우 무료 배송됩니다.
        </p>
      </CartInfo>

      <CartFooter price={price} shippingFee={shippingFee} totalPrice={totalPrice} />
    </>
  );
}

export default CartMain;

export const CartInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  margin: 52px 0 13px 0;
`;

export const InfoIconImage = styled.img`
  width: 13px;
  height: 13px;
`;
