import { useState } from 'react';

import axios from 'axios';
import { useHistory } from 'react-router';

import NumberInput from '../../components/commons/NumberInput/NumberInput';
import Loading from '../../components/commons/Loading/Loading';
import NotFound from '../../components/commons/NotFound/NotFound';
import Button from '../../components/commons/Button/Button';
import Tooltip from '../../components/commons/Tooltip/Tooltip';

import useProductDetail from '../../hooks/productDetail';

import { COLORS, PATH, STATUS_CODE, URL } from '../../constants';
import { getMoneyString } from '../../utils/format';

import * as Styled from './ProductDetailPage.styles';

const ProductDetailPage = () => {
  const history = useHistory();
  const [productQuantity, setProductQuantity] = useState<string>('1');
  const [isToolTipShown, setToolTipShown] = useState<boolean>(false);
  const { product, loading, responseOK } = useProductDetail();

  if (loading) {
    return <Loading />;
  }

  if (!loading && !responseOK) {
    return <NotFound message="상품을 찾을 수 없습니다." />;
  }

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

  const productPrice = getMoneyString(Number(product.price) * Number(productQuantity));

  return (
    <Styled.ProductDetailPage>
      <Styled.ProductWrapper>
        <Styled.ProductImage src={product.thumbnail} />
        <Styled.ProductNameWrapper>
          <Styled.ProductName>{product.name}</Styled.ProductName>
          <NumberInput value={productQuantity} setValue={setProductQuantity} />
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
