import { getProduct } from '@/api/product';
import Button from '@/components/common/Button/Button';
import Image from '@/components/common/Image/Image';
import Loading from '@/components/common/Loading/Loading';
import Modal from '@/components/common/Modal/Modal';
import CartAdd from '@/components/product/CartAdd/CartAdd';
import { useThunkFetch } from '@/hooks/useFecth';
import { useModal } from '@/hooks/useModal';
import useResponsive from '@/hooks/useResponsive';
import { fetchGetCartAsync } from '@/store/cart/action';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ErrorContainer from '../../components/common/ErrorContainer/ErrorContainer';
import PageTemplate from '../../components/common/PageTemplate/PageTemplate';
import * as Styled from './ProductDetail.style';

function ProductDetail() {
  const responsive = useResponsive();
  const { isShowModal, openModal, closeModal } = useModal();

  const { productId } = useParams();

  const { isLoading: isCartLoading, cartList } = useThunkFetch({
    selector: state => state.cart,
    thunkAction: fetchGetCartAsync,
    deps: [],
  });

  const [{ isLoading, product }, setProduct] = useState({
    isLoading: false,
    product: null,
  });

  useEffect(() => {
    const fetch = async () => {
      setProduct(prev => ({ ...prev, isLoading: true }));
      try {
        const { product } = await getProduct(productId);
        setProduct(prev => ({ ...prev, isLoading: false, product }));
      } catch ({ message }) {
        setProduct(prev => ({ ...prev, isLoading: false }));
      }
    };
    fetch();
  }, []);

  if (isLoading || isCartLoading) {
    return (
      <PageTemplate>
        <Styled.Container>
          <Loading fontSize="2rem">👻</Loading>
        </Styled.Container>
      </PageTemplate>
    );
  }

  if (product === null) {
    return (
      <PageTemplate>
        <ErrorContainer>🚧 잘못된 접근입니다. 🚧 </ErrorContainer>
      </PageTemplate>
    );
  }

  const onClickCartAddBUtton = () => {
    openModal();
  };

  const isShowCartButton = !cartList.find(cart => cart.id === (product as any)?.id);

  return (
    <PageTemplate>
      <Styled.Container>
        <Styled.Title>상품 상세</Styled.Title>

        <Styled.InformationWrapper>
          <Image
            src={(product as any).imageURL}
            alt=""
            width={responsive === 'desktop' ? '400px' : '250px'}
          />
          <Styled.Name>{(product as any).name}</Styled.Name>
          <Styled.Price>
            <span>금액 </span>
            <span>{(product as any).price}원</span>
          </Styled.Price>
        </Styled.InformationWrapper>

        {isShowCartButton && (
          <Styled.ButtonWrapper onClick={onClickCartAddBUtton}>
            <Button width="100%" padding="20px">
              장바구니
            </Button>
          </Styled.ButtonWrapper>
        )}

        {isShowModal && (
          <Modal closeModal={closeModal}>
            <CartAdd product={product} closeModal={closeModal} />
          </Modal>
        )}
      </Styled.Container>
    </PageTemplate>
  );
}

export default ProductDetail;
