import { Product } from '../../../types/products';
import { Button } from '../../common/Button/Button.styles';
import QuantityStepper from '../../common/QuantityStepper';
import * as S from './ItemCartDialog.styles';
import { useRef } from 'react';
import useCart from '../../../hooks/cart/useCart';
import Flex from '../../common/Flex';
import { createPortal } from 'react-dom';

interface ItemCartDialogProps extends Product {
  closeModal: VoidFunction;
}

const ItemCartDialog: React.FC<ItemCartDialogProps> = (props) => {
  const { id, name, price, imageUrl, closeModal } = props;
  const quantityRef = useRef<HTMLInputElement>(null);
  const { addInCart } = useCart();

  const addItemToCart = () => {
    const quantity = Number(quantityRef.current!.value);

    addInCart({ id, name, price, imageUrl }, quantity);

    closeModal();
  };

  return createPortal(
    <>
      <S.BackDrop onClick={closeModal} />
      <S.Dialog open>
        <S.Box>
          <S.Thumbnail src={imageUrl} alt={name} />
          <S.Name>{name}</S.Name>
          <S.Price>{price.toLocaleString()} 원</S.Price>
          <QuantityStepper ref={quantityRef} label="item-quantity" />
          <Flex width="60%" justify="space-between">
            <Button size="M" view="dark" type="button" onClick={closeModal}>
              취소하기
            </Button>
            <Button size="M" view="dark" onClick={addItemToCart}>
              추가하기
            </Button>
          </Flex>
        </S.Box>
      </S.Dialog>
    </>,
    document.body
  );
};

export default ItemCartDialog;
