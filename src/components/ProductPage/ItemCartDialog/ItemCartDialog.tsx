import { Dialog } from 'react-tiny-dialog';
import SHOPPING_CART from '../../../assets/png/cart-icon.png';
import { Product } from '../../../types/products';
import { Button } from '../../common/Button/Button.styles';
import QuantityStepper from '../../common/QuantityStepper/QuantityStepper';
import * as S from './ItemCartDialog.styles';
import { useRef } from 'react';
import useCart from '../../../hooks/cart/useCart';
import Flex from '../../common/Flex';

type ItemCartDialogProps = Product;

const ItemCartDialog: React.FC<ItemCartDialogProps> = (props) => {
  const { id, name, price, imageUrl } = props;
  const quantityRef = useRef<HTMLInputElement>(null);
  const { addInCart } = useCart();

  const addItemToCart = () => {
    const quantity = Number(quantityRef.current!.value);

    addInCart({ id, name, price, imageUrl }, quantity);
  };

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <S.CartButton>
          <S.CartImg alt="장바구니 아이콘" src={SHOPPING_CART} />
        </S.CartButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.BackDrop />
        <Dialog.Content>
          <S.Box>
            <S.Thumbnail src={imageUrl} alt={name} />
            <S.Name>{name}</S.Name>
            <S.Price>{price.toLocaleString()} 원</S.Price>
            <QuantityStepper ref={quantityRef} label="item-quantity" />
            <Flex width="60%" justify="space-between">
              <Dialog.Close asChild>
                <Button size="M" view="dark">
                  취소하기
                </Button>
              </Dialog.Close>
              <Dialog.Close asChild onClick={addItemToCart}>
                <Button size="M" view="dark">
                  추가하기
                </Button>
              </Dialog.Close>
            </Flex>
          </S.Box>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default ItemCartDialog;
