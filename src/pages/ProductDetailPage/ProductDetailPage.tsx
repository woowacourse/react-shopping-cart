import * as Styled from './ProductDetailPage.styles';
import { useState, useEffect } from 'react';
import Button from '../../components/commons/Button/Button';
import NumberInput from '../../components/commons/NumberInput/NumberInput';
import { COLORS, STATUS_CODE, URL } from '../../constants';
import noImagePNG from '../../assets/images/no-image.png';
import axios from 'axios';
import Loading from '../../components/commons/Loading/Loading';
import NotFound from '../../components/commons/NotFound/NotFound';

const defaultProduct: Product = {
  id: '0',
  name: '상품 정보 없음',
  price: '0',
  thumbnail: noImagePNG,
  stock: 0,
};

const ProductDetailPage = () => {
  const productId = window.location.hash.split('/').slice(-1);
  const [productQuantity, setProductQuantity] = useState<string>('1');
  const [product, setProduct] = useState<Product>(defaultProduct);
  const [loading, setLoading] = useState<boolean>(true);
  const [responseOK, setResponseOK] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL.PRODUCTS}/${productId}`);
        console.log(response);
        if (response.status !== STATUS_CODE.GET_SUCCESS) {
          throw new Error('상품 상세 정보 조회 실패');
        }
        setProduct(response.data);
        setResponseOK(true);
      } catch (error) {
        console.error(error);
        setResponseOK(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Styled.ProductDetailPage>
        <Loading />
      </Styled.ProductDetailPage>
    );
  }

  if (!loading && !responseOK) {
    return (
      <Styled.ProductDetailPage>
        <NotFound message="상품을 찾을 수 없습니다." />
      </Styled.ProductDetailPage>
    );
  }

  return (
    <Styled.ProductDetailPage>
      <Styled.ProductWrapper>
        <Styled.ProductImage src={product.thumbnail} />
        <Styled.ProductNameWrapper>
          <Styled.ProductName>{product.name}</Styled.ProductName>
          <NumberInput initValue={1} value={productQuantity} setValue={setProductQuantity} />
        </Styled.ProductNameWrapper>
        <Styled.ProductPriceWrapper>
          <Styled.PriceLabel>금액</Styled.PriceLabel>
          <Styled.ProductPrice>{Number(product.price) * Number(productQuantity)}원</Styled.ProductPrice>
        </Styled.ProductPriceWrapper>
        <Button size="LG" backgroundColor={COLORS.BROWN_500}>
          장바구니 담기
        </Button>
      </Styled.ProductWrapper>
    </Styled.ProductDetailPage>
  );
};

export default ProductDetailPage;
