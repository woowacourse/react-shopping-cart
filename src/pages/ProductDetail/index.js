import React from 'react';
import { useParams } from 'react-router';
import { Button, Thumbnail } from '../../components/shared';
import { Container, DetailWrapper, NameWrapper, PriceWrapper } from './style';
import { useCart } from '../../hooks/useCart';
import { useFetch } from '../../hooks/useFetch';
import { productAPI } from '../../apis';
import { COLOR } from '../../constants';
import { SUCCESS } from '../../constants/status';
import notFoundImage from '../../assets/images/not-found-product.png';

const ProductDetail = () => {
  const { id } = useParams();
  const { state } = useFetch({ asyncFunc: productAPI.getProduct, args: [id] });
  const { cartStatus, addCartItem } = useCart();

  const { error, data: product } = state;

  if (error) {
    return <>존재하지 않은 상품입니다.</>;
  }

  const onAddCartItem = async item => {
    addCartItem(item);
    if (cartStatus === SUCCESS) {
      alert('장바구니에 성공적으로 추가되었습니다.');
    }
  };

  return (
    <Container>
      {product && (
        <>
          <Thumbnail
            size="x-large"
            image={product.imageUrl}
            notFoundImage={notFoundImage}
            alt={`${product.name} 상품 이미지`}
          />
          <DetailWrapper>
            <NameWrapper>
              <h2>{product.name}</h2>
            </NameWrapper>
            <PriceWrapper>
              <p>금액</p>
              <p>{`${product.price?.toLocaleString('ko-KR')}원`}</p>
            </PriceWrapper>
            <Button
              type="button"
              size="medium"
              width="100%"
              backgroundColor={COLOR.BROWN}
              onClick={() => {
                onAddCartItem(product);
              }}
            >
              장바구니
            </Button>
          </DetailWrapper>
        </>
      )}
    </Container>
  );
};

export default ProductDetail;
