import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { Container, ImageContainer, Image, Name, PriceContainer, ShoppingCartButton } from './ProductDetailPage.styles';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import { numberWithCommas } from '../../shared/utils';
import { useModal, useServerAPI } from '../../hooks';
import { addShoppingCartItemAsync } from '../../redux/action';
import { SuccessAddedModal } from '../../components';
import { SCHEMA } from '../../constants';

const ProductDetailPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { setModalOpen, Modal } = useModal(false);

  const { value: productList } = useServerAPI([], SCHEMA.PRODUCT);

  const product = {
    product_id: 'xYmzN8N6FqFhtL73w61z',
    price: 10000,
    name: '치킨',
    image_url: 'https://cdn-mart.baemin.com/sellergoods/bulk/20201119-141118/16215-main-01.jpg',
  };

  const putProductInShoppingCart = productId => {
    dispatch(addShoppingCartItemAsync(productId));

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
          <span>{`${numberWithCommas(product.price)}원`}</span>
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
