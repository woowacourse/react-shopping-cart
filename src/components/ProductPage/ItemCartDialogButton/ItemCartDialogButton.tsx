import { Dialog } from 'react-tiny-dialog';
import SHOPPING_CART from '../../../assets/png/cart-icon.png';
import { Product } from '../../../types/products';
import QuantityStepper from '../../common/QuantityStepper/QuantityStepper';
import * as S from './ItemCartDialogButton.styles';
import { useRef } from 'react';
import { useMutateCart } from '../../../hooks/cart/cart';
import Button from '../../common/Button/Button';

type ItemCartDialogButtonProps = Product;

const ItemCartDialogButton: React.FC<ItemCartDialogButtonProps> = (props) => {
  const { id, name, price, imageUrl } = props;
  const quantityRef = useRef<HTMLInputElement>(null);
  const { addItemToCartMutation } = useMutateCart();

  const addItemToCart = () => {
    const quantity = Number(quantityRef.current?.value);

    addItemToCartMutation({ id, quantity });
  };

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <S.CartButton>
          <S.CartImg alt="cart" src={SHOPPING_CART} />
        </S.CartButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.BackDrop />
        <Dialog.Content>
          <S.Box>
            <S.Thumbnail src={imageUrl} alt={name} />
            <S.Name>{name}</S.Name>
            <S.Price>{price.toLocaleString()} 원</S.Price>
            <QuantityStepper ref={quantityRef} max={100} min={1} />
            <Dialog.Close asChild onClick={addItemToCart}>
              <Button size="M" view="black">
                추가하기
              </Button>
            </Dialog.Close>
          </S.Box>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default ItemCartDialogButton;
