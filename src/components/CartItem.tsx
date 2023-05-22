import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { ReactComponent as Trash } from '../assets/icons/trash.svg';
import useCartProduct from '../hooks/useCart';
import useCheck from '../hooks/useCheck';
import { cartItemFamily } from '../recoil/selectors/cartItemFamily';
import { CheckedCartIdList } from '../recoil/selectors/checkedCartList';
import { productFamily } from '../recoil/selectors/productFamily';
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
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Image = styled.img`
  width: 144px;
  height: 144px;
  background-color: black;

  @media (max-width: 480px) {
    width: 90px;
    height: 104px;
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

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const CardItemPrice = styled.div`
  &::after {
    content: '원';
    padding-left: 8px;
  }
`;

type cartItemProps = {
  productId: Product['id'];
  // quantity: CartProduct['quantity'];
};

const CartItem = (props: cartItemProps) => {
  const { productId } = props;

  const product = useRecoilValue(productFamily(productId));
  const cartProduct = useRecoilValue(cartItemFamily(productId));
  const isChecked = useRecoilValue(CheckedCartIdList).includes(cartProduct!.id);

  const { setQuantity } = useCartProduct(productId);
  const { setCheck } = useCheck(cartProduct!.id);

  if (!product) return <div>Error!</div>;
  if (!cartProduct) return <div>Error!</div>;

  const handleOnclickTrash = () => {
    setQuantity(0);
  };
  return (
    <ItemContainer>
      <CheckBox onClick={setCheck} defaultChecked={isChecked} />
      <Image src={product.imageUrl} alt={product.name} />
      <CardItemTitle>[든든] {product.name}</CardItemTitle>
      <CartItemInfo>
        <Trash onClick={handleOnclickTrash} />
        <Stepper
          width="113px"
          height="60px"
          min={0}
          value={cartProduct?.quantity || 0}
          onChange={setQuantity}
        />
        <CardItemPrice>{product.price.toLocaleString('ko-KR')}</CardItemPrice>
      </CartItemInfo>
    </ItemContainer>
  );
};

export default CartItem;
