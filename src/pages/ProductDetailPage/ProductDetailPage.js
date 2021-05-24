import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { Container, ImageContainer, Image, Name, PriceContainer, ShoppingCartButton } from './ProductDetailPage.styles';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import { numberWithCommas } from '../../shared/utils';
import { useModal, useFetch } from '../../hooks';
import { addShoppingCartItemAsync } from '../../redux/slice';
import { SuccessAddedModal } from '../../components';
import { requestProduct, requestProductList } from '../../service/product';

const ProductDetailPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id: productId } = useParams();

  const { setModalOpen, Modal } = useModal(false);

  const { data: productList } = useFetch([], requestProductList);
  const { data: product } = useFetch({}, () => requestProduct(productId));

  const putProductInShoppingCart = id => {
    dispatch(addShoppingCartItemAsync({ product_id: id }));

    setModalOpen(true);
  };

  return (
    <ScreenContainer route={location.pathname}>
      <Container>
        <ImageContainer>
          <Image src={product.image_url} alt={`product-${product.product_id}-img`} />
        </ImageContainer>
        <Name>{product.name}</Name>
        <PriceContainer>
          <span>금액</span>
          <span>{`${numberWithCommas(product.price || 0)}원`}</span>
        </PriceContainer>
        <ShoppingCartButton onClick={() => putProductInShoppingCart(product.product_id)}>장바구니</ShoppingCartButton>
      </Container>

      <Modal>
        <SuccessAddedModal productList={productList} setModalOpen={setModalOpen} />
      </Modal>
    </ScreenContainer>
  );
};

export default ProductDetailPage;
