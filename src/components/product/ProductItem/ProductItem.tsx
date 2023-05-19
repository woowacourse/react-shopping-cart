import { useRecoilValue } from 'recoil';

import { AddIcon } from '../../../assets';
import { useModal } from '../../../hooks/common/useModal';
import { useCart } from '../../../hooks/useCart';
import { cartItemQuantityState } from '../../../store/cart';
import { ProductItemData } from '../../../types';
import { priceFormatter } from '../../../utils/formatter';
import Modal from '../../common/Modal/Modal';
import Toast from '../../common/Toast/Toast';
import ProductAddition from '../ProductAddition/ProductAddition';
import * as S from './ProductItem.styles';

type ProductItemProps = ProductItemData;

const ProductItem = ({ ...information }: ProductItemProps) => {
  const cartItemQuantity = useRecoilValue(cartItemQuantityState(information.id));
  const { isAdded, addItemQuantity } = useCart();
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();

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
          <Modal handleClose={handleModalClose}>
            <ProductAddition
              addItemQuantity={addItemQuantity}
              handleModalClose={handleModalClose}
              {...information}
            />
          </Modal>
        )}
      </S.ProductItemContainer>
      {isAdded && <Toast>장바구니에 상품을 추가했습니다.</Toast>}
    </>
  );
};

export default ProductItem;
