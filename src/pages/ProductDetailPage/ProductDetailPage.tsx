import { useState } from 'react';

import { useHistory } from 'react-router';

import NumberInput from '../../components/commons/NumberInput/NumberInput';
import Loading from '../../components/commons/Loading/Loading';
import NotFound from '../../components/commons/NotFound/NotFound';
import Button from '../../components/commons/Button/Button';
import Tooltip from '../../components/commons/Tooltip/Tooltip';

import useProductDetail from '../../hooks/productDetail';

import { COLORS, PATH, RESPONSE_RESULT } from '../../constants';
import { getMoneyString } from '../../utils/format';
import { API } from '../../services/api';

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

  const onAddItemInCart = async () => {
    const responseResult = await API.ADD_ONE_ITEM_IN_CART(product, productQuantity);

    if (responseResult === RESPONSE_RESULT.FAILURE) {
      alert('상품을 장바구니에 담지 못했습니다.');
      return;
    }

    setToolTipShown(true);
  };

  const onMoveToCartPage = () => {
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
                  <Button size="SM" onClick={onMoveToCartPage}>
                    장바구니 가기
                  </Button>
                }
              >
                상품을 장바구니에 담았습니다.
              </Tooltip>
            </Styled.TooltipWrapper>
          )}
          <Button onClick={onAddItemInCart} size="LG" backgroundColor={COLORS.BROWN_500}>
            장바구니 담기
          </Button>
        </Styled.ButtonWrapper>
      </Styled.ProductWrapper>
    </Styled.ProductDetailPage>
  );
};

export default ProductDetailPage;
