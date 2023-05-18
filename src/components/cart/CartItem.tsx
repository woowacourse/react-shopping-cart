import { styled } from 'styled-components';
import { CartItemInfo } from '../../types';
import { useCart } from '../../hooks/useCart';
import { TrashCanIcon } from '../../assets/svg';
import Price from '../common/Price';
import Stepper from '../Stepper';

interface Props {
  cartItemInfo: CartItemInfo;
  deleteCheckedItem: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function CartItem({ cartItemInfo, deleteCheckedItem }: Props) {
  const { name, price, imageUrl } = cartItemInfo.product;
  const { updateProductQuantity, deleteFromCart } = useCart(cartItemInfo.product);

  const handleDeleteCartItem = () => {
    deleteCheckedItem((prev) => prev.filter((itemId) => itemId !== cartItemInfo.id));
    deleteFromCart();
  };

  return (
    <>
      <Style.ProductImage src={imageUrl} alt={name} />
      <Style.ProductName htmlFor={`${name}-checkbox`}>{name}</Style.ProductName>
      <Style.TrashCanIConAndStepperAndPriceContainer>
        <Style.DeleteCartItemButton onClick={handleDeleteCartItem}>
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

  ProductName: styled.label`
    width: 170px;

    font-size: 18px;
    color: var(--grey-400);

    cursor: pointer;
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
