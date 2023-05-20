import { styled } from 'styled-components';
import BucketCounter from '@components/common/BucketCounter';
import CheckBox from '@components/common/CheckBox';
import { CART_ITEM_REMOVE_BUTTON } from '@assets/images';

interface CartItemProps {
  id: number;
  name: string;
  imageUrl: string;
  quantity: number;
  price: number;
}

const CartItem = ({ id, name, imageUrl, quantity, price }: CartItemProps) => {
  return (
    <CartItemWrapper>
      <CheckBox />
      <CartItemImg src={imageUrl} alt="상품 사진" />
      <CartItemName>{name}</CartItemName>
      <CartItemInformationWrapper>
        <RemoveCardItemImg src={CART_ITEM_REMOVE_BUTTON} />
        <BucketCounter id={id} quantity={quantity} kind="big" />
        <CartItemMoney>{price}</CartItemMoney>
      </CartItemInformationWrapper>
    </CartItemWrapper>
  );
};

const CartItemWrapper = styled.div`
  display: flex;
  align-items: flex-start;

  width: 100%;
  margin: 23px 0;
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
