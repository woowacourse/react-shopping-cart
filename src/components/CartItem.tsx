import { styled } from 'styled-components';
import { ReactComponent as Trash } from '../assets/icons/trash.svg';
import useCartProduct from '../hooks/useCart';
import type { Product } from '../type';
import CheckBox from './CheckBox';
import Stepper from './Stepper';

const ItemContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 25px;
  padding-bottom: 25px;

  &:not(:last-child) {
    border-bottom: 1.5px solid #cccccc;
  }
`;

const Image = styled.img`
  width: 144px;
  height: 144px;
  background-color: black;

  @media (max-width: 480px) {
    height: auto;
  }
`;

const CartItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  margin-left: auto;
`;

const CardItemTitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
`;

type cartItemProps = {
  productId: Product['id'];
};

const CartItem = (props: cartItemProps) => {
  const { productId } = props;

  const { setQuantity } = useCartProduct(productId);

  return (
    <ItemContainer>
      <CheckBox />
      <Image />
      <CardItemTitle>[든든] 야채바삭 김말이 700</CardItemTitle>
      <CartItemInfo>
        <Trash />
        <Stepper width="113px" height="60px" min={0} value={0} onChange={setQuantity} />
        <div>1,000원</div>
        {/* <div>{product.price.toLocaleString('ko-KR')}</div> */}
      </CartItemInfo>
    </ItemContainer>
  );
};

export default CartItem;
