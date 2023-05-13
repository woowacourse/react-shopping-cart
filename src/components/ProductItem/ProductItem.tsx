import { useRecoilValue } from 'recoil';

import { AddIcon } from '../../assets';
import { useCartAddition } from '../../hooks/useCart';
import { useModal } from '../../hooks/useModal';
import { cartItemQuantityState } from '../../store/cart';
import { ProductItemData } from '../../types';
import { priceFormatter } from '../../utils/formatter';
import ProductAddition from '../ProductAddition/ProductAddition';
import Modal from '../common/Modal/Modal';
import Toast from '../common/Toast/Toast';
import * as S from './ProductItem.styles';

interface ProductItemProps {
  information: ProductItemData;
}

const ProductItem = ({ information }: ProductItemProps) => {
  const cartItemQuantity = useRecoilValue(cartItemQuantityState(information.id));
  const { isAdded, setCartItemQuantity } = useCartAddition(information.id);
  const [isModalOpen, handleModalOpen, handleModalClose, handleModalClosePress] = useModal();

  return (
    <>
      <S.ProductItemContainer>
        <S.ItemImageContainer>
          <S.ItemImage src={information.imageUrl} alt={information.name} />
          <S.ItemButton
            type="button"
            value={cartItemQuantity || 0}
            variant={cartItemQuantity ? 'primary' : 'textButton'}
            onClick={handleModalOpen}
          >
            {cartItemQuantity ? cartItemQuantity : <AddIcon width={16} height={16} />}
          </S.ItemButton>
        </S.ItemImageContainer>
        <S.ItemName size="small">{information.name}</S.ItemName>
        <S.ItemPrice size="large">{priceFormatter(information.price)}원</S.ItemPrice>
        {isModalOpen && (
          <Modal handleClose={handleModalClose} handleClosePress={handleModalClosePress}>
            <ProductAddition
              handleModalClose={handleModalClose}
              productInformation={information}
              setCartItemQuantity={setCartItemQuantity}
            />
          </Modal>
        )}
      </S.ProductItemContainer>
      {isAdded && <Toast status="success">장바구니에 상품을 추가했습니다.</Toast>}
    </>
  );
};

export default ProductItem;
