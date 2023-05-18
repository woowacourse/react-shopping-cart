import { styled } from 'styled-components';
import { TrashCanIcon } from '../../assets/svg';
import Stepper from '../Stepper';
import { useCart } from '../../hooks/useCart';
import Price from '../common/Price';
import { CartItemInfo } from '../../types';

interface Props {
  cartItemInfo: CartItemInfo;
}

export default function CartItem({ cartItemInfo }: Props) {
  const { name, price, imageUrl } = cartItemInfo.product;
  const { updateProductQuantity, deleteFromCart } = useCart(cartItemInfo.product);

  return (
    <>
      <Style.ProductImage src={imageUrl} alt={name} />
      <Style.ProductName>{name}</Style.ProductName>
      <Style.TrashCanIConAndStepperAndPriceContainer>
        <Style.DeleteCartItemButton onClick={deleteFromCart}>
          <TrashCanIcon />
        </Style.DeleteCartItemButton>
        <Stepper
          quantity={cartItemInfo?.quantity}
          minQuantity={1}
          updateQuantity={updateProductQuantity}
        />
        <Price price={price * cartItemInfo?.quantity} />
      </Style.TrashCanIConAndStepperAndPriceContainer>
    </>
  );
}

const Style = {
  ProductImage: styled.img`
    width: 150px;
    height: 150px;

    margin-right: 20px;
  `,

  ProductName: styled.h2`
    width: 170px;

    font-size: 18px;
    color: var(--grey-400);
  `,

  TrashCanIConAndStepperAndPriceContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;

    width: 300px;
  `,

  DeleteCartItemButton: styled.button`
    all: unset;
    cursor: pointer;
  `,
};
