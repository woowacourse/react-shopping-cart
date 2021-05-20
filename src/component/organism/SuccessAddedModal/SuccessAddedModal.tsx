import { ProductType } from '../../../type';
import ColumnProductItem from '../../molecule/ColumnProductItem/ColumnProductItem';
import Modal from '../Modal/Modal';
import {
  ModalText,
  ModalButton,
  RecommendedContainer,
  RecommendedTitle,
  RecommendedList,
} from './SuccessAddedModal.styles';

interface SuccessAddedModalProps {
  isModalOpen: boolean;
  productList: Array<ProductType>;
  openModal: React.MouseEventHandler<HTMLButtonElement>;
  onClickModalCloseButton: React.MouseEventHandler<HTMLDivElement>;
  onClickMoveShoppingCartButton: React.MouseEventHandler<HTMLButtonElement>;
}
const SuccessAddedModal = ({
  isModalOpen,
  productList,
  openModal,
  onClickMoveShoppingCartButton,
  onClickModalCloseButton,
}: SuccessAddedModalProps) => (
  <>
    {isModalOpen && (
      <Modal onClickClose={onClickModalCloseButton}>
        <ModalText>상품이 장바구니에 담겼습니다.</ModalText>
        <ModalButton onClick={onClickMoveShoppingCartButton}>
          {'장바구니 바로가기 >'}
        </ModalButton>

        <RecommendedContainer>
          <RecommendedTitle>
            ❤️ 잠깐! 아래 상품들도 살펴보세요! ❤️
          </RecommendedTitle>
          <RecommendedList>
            {productList
              .slice(0, 3)
              .map(({ product_id, image_url, name, price }) => (
                <ColumnProductItem
                  key={product_id}
                  product_id={product_id}
                  image_url={image_url}
                  name={name}
                  price={price}
                  onClickShoppingCartButton={openModal}
                  isIconsVisible={false}
                />
              ))}
          </RecommendedList>
        </RecommendedContainer>
      </Modal>
    )}
  </>
);

export default SuccessAddedModal;
export type { SuccessAddedModalProps };
