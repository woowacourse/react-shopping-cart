import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { Container, ImageContainer, Image, Name, PriceContainer, ShoppingCartButton } from './ProductDetailPage.styles';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import { numberWithCommas } from '../../shared/utils';
import { useModal, useFetch } from '../../hooks';
import { addShoppingCartItemAsync } from '../../redux/slice';
import { ErrorMessage, SuccessAddedModal } from '../../components';
import { requestProduct } from '../../service/product';
import productNotFoundImg from '../../shared/assets/img/product_not_found.jpeg';

const ProductDetailPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id: productId } = useParams();

  const { setModalOpen, Modal } = useModal(false);

  const [product, getProductError] = useFetch({}, () => requestProduct(productId));

  const putProductInShoppingCart = id => {
    dispatch(addShoppingCartItemAsync({ product_id: id }));

    setModalOpen(true);
  };

  const onShowErrorImage = event => {
    event.target.src = productNotFoundImg;
  };

  return (
    <ScreenContainer route={location.pathname}>
      {getProductError ? (
        <ErrorMessage>상품 상세 정보를 불러올 수 없습니다 😭</ErrorMessage>
      ) : (
        <Container>
          <ImageContainer>
            <Image
              src={product.image_url}
              alt={`product-${product.product_id}-img`}
              onError={onShowErrorImage}
              loading="eager"
            />
          </ImageContainer>
          <Name>{product.name}</Name>
          <PriceContainer>
            <span>금액</span>
            <span>{`${numberWithCommas(product.price || 0)}원`}</span>
          </PriceContainer>
          <ShoppingCartButton onClick={() => putProductInShoppingCart(product.product_id)}>장바구니</ShoppingCartButton>
        </Container>
      )}

      <Modal>
        <SuccessAddedModal setModalOpen={setModalOpen} />
      </Modal>
    </ScreenContainer>
  );
};

export default ProductDetailPage;
