import useControlCart from '@hooks/useControlCart';
import { styled } from 'styled-components';
import BucketCounter from '@components/common/BucketCounter';
import CheckBox from '@components/common/CheckBox';
import { A_MOCK, CART_ITEM_REMOVE_BUTTON } from '@assets';

interface CartItemProps {
  name: string;
}

const CartItem = (props: CartItemProps) => {
  const { removeProductFromCart } = useControlCart();

  return (
    <CartItemWrapper>
      <CheckBox />
      <CartItemImg src={A_MOCK} alt="상품 사진" />
      <CartItemName>{props.name}</CartItemName>
      <CartItemInformationWrapper>
        <RemoveCardItemImg src={CART_ITEM_REMOVE_BUTTON} />
        <BucketCounter
          removeProductFromCart={() => removeProductFromCart(1)}
          kind="big"
        />
        <CartItemMoney>7000</CartItemMoney>
      </CartItemInformationWrapper>
    </CartItemWrapper>
  );
};

const CartItemWrapper = styled.div`
  display: flex;
  align-items: flex-start;

  width: 740px;
`;

const CartItemImg = styled.img`
  width: 144px;
  height: 147px;

  margin-left: 15px;

  background: rgba(0, 0, 0, 0.05);
`;

const CartItemName = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  margin-left: 20px;

  letter-spacing: 0.5px;

  color: #333333;
`;

const CartItemInformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;

  flex-grow: 1;

  height: 147px;
`;

const RemoveCardItemImg = styled.img`
  width: 24px;
  height: 24px;
`;

const CartItemMoney = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  letter-spacing: 0.5px;

  color: #333333;
`;

export default CartItem;
