import { Product } from '../../../types/products';
import Flex from '../../common/Flex';
import SHOPPING_CART from '../../../assets/png/cart-icon.png';
import ItemCartDialog from '../ItemCartDialog';
import * as S from './ProductItem.styles';
import useModal from '../../../hooks/common/useModal';
import ErrorBoundary from '../../common/ErrorBoundary';

type ProductItemProps = Product;

const ProductItem: React.FC<ProductItemProps> = ({
  id,
  name,
  price,
  imageUrl,
}) => {
  const { isModalOpen, openModal, closeModal } = useModal(false);

  return (
    <S.Root>
      <S.Thumbnail alt={name} src={imageUrl} />
      <S.Info>
        <Flex dir="column">
          <S.Name>{name}</S.Name>
          <S.Price>{price.toLocaleString()} 원</S.Price>
        </Flex>
        <S.CartButton>
          <S.CartImg
            alt="장바구니 아이콘"
            src={SHOPPING_CART}
            onClick={openModal}
          />
        </S.CartButton>
      </S.Info>
      {isModalOpen && (
        <ErrorBoundary>
          <ItemCartDialog
            id={id}
            name={name}
            price={price}
            imageUrl={imageUrl}
            closeModal={closeModal}
          />
        </ErrorBoundary>
      )}
    </S.Root>
  );
};

export default ProductItem;
