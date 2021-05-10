import * as Styled from './ProductDetailPage.styles';
import { useState, useEffect } from 'react';
import Button from '../../components/commons/Button/Button';
import NumberInput from '../../components/commons/NumberInput/NumberInput';
import { COLORS, PATH, STATUS_CODE, URL } from '../../constants';
import noImagePNG from '../../assets/images/no-image.png';
import axios from 'axios';
import Loading from '../../components/commons/Loading/Loading';
import NotFound from '../../components/commons/NotFound/NotFound';
import { getMoneyString } from '../../utils/format';
import Tooltip from '../../components/commons/Tooltip/Tooltip';
import { useHistory } from 'react-router';

const defaultProduct: Product = {
  id: '0',
  name: '상품 정보 없음',
  price: '0',
  thumbnail: noImagePNG,
  stock: 0,
};

const ProductDetailPage = () => {
  const history = useHistory();
  const [productQuantity, setProductQuantity] = useState<string>('1');
  const [product, setProduct] = useState<Product>(defaultProduct);
  const [loading, setLoading] = useState<boolean>(true);
  const [responseOK, setResponseOK] = useState<boolean>(true);
  const [isToolTipShown, setToolTipShown] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productId = window.location.hash.split('/').slice(-1);
        const response = await axios.get(`${URL.PRODUCTS}/${productId}`);
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

  const onCartButtonClick = async () => {
    try {
      const response = await axios.post(URL.CART, { ...product, quantity: Number(productQuantity) });
      if (response.status !== STATUS_CODE.POST_SUCCESS) {
        throw new Error('상품을 장바구니에 담지 못했습니다.');
      }
      setToolTipShown(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onTooltipButtonClick = () => {
    history.push(PATH.CART);
  };

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

  const productPrice = getMoneyString(Number(product.price) * Number(productQuantity));

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
          <Styled.ProductPrice>{productPrice}원</Styled.ProductPrice>
        </Styled.ProductPriceWrapper>
        <Styled.ButtonWrapper>
          {isToolTipShown && (
            <Styled.TooltipWrapper>
              <Tooltip
                setTooltipShown={setToolTipShown}
                timeOut={3000}
                button={
                  <Button size="SM" onClick={onTooltipButtonClick}>
                    장바구니 가기
                  </Button>
                }
              >
                상품을 장바구니에 담았습니다.
              </Tooltip>
            </Styled.TooltipWrapper>
          )}
          <Button onClick={onCartButtonClick} size="LG" backgroundColor={COLORS.BROWN_500}>
            장바구니 담기
          </Button>
        </Styled.ButtonWrapper>
      </Styled.ProductWrapper>
    </Styled.ProductDetailPage>
  );
};

export default ProductDetailPage;
