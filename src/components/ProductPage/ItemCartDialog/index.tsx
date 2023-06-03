import { Product } from '../../../types/products';
import { Button } from '../../common/Button/Button.styles';
import QuantityStepper from '../../common/QuantityStepper';
import * as S from './ItemCartDialog.styles';
import useCart from '../../../hooks/cart/useCart';
import Flex from '../../common/Flex';
import { createPortal } from 'react-dom';
import { useSetRecoilState } from 'recoil';
import { checkedItemIdList } from '../../../recoil/cart';
import useCounter from '../../../hooks/common/useCounter';

interface ItemCartDialogProps extends Product {
  closeModal: VoidFunction;
}

const ItemCartDialog: React.FC<ItemCartDialogProps> = ({
  id,
  name,
  price,
  imageUrl,
  closeModal,
}) => {
  const { addInCart } = useCart();
  const setCheckedList = useSetRecoilState(checkedItemIdList);
  const [quantity, increase, decrease] = useCounter({ max: 100, min: 1 });

  const addItemToCart = () => {
    addInCart({ id, name, price, imageUrl }, quantity);
    setCheckedList((list) => [...list, id]);

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
          <QuantityStepper
            label="상품상세목록 수량"
            value={quantity}
            increase={increase}
            decrease={decrease}
          />
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
