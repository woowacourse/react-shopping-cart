import SelectAllBox from '../SelectBox/SelectAllBox';
import CartList from './CartList';
import CartFooter from './CartFooter';
import { infoIcon } from '../../assets';
import styled from '@emotion/styled';

interface CartMainProps {
  price: number;
  shippingFee: number;
  totalPrice: number;
}

function CartMain({ price, shippingFee, totalPrice }: CartMainProps) {
  return (
    <>
      <SelectAllBox />
      <CartList />

      <CartInfo>
        <InfoIconImage src={infoIcon} alt="infoIcon" />
        <p>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</p>
      </CartInfo>

      <CartFooter price={price} shippingFee={shippingFee} totalPrice={totalPrice} />
    </>
  );
}

export default CartMain;

const CartInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  margin: 52px 0 13px 0;
`;

const InfoIconImage = styled.img`
  width: 13px;
  height: 13px;
`;
