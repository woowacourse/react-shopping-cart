import PropTypes from 'prop-types';
import React from 'react';
import { PAGES } from '../../../constants/appInfo';
import PALETTE from '../../../constants/palette';
import AmountInput from '../../common/AmountInput';
import Button from '../../common/Button';
import Checkbox from '../../common/Checkbox';
import FlexContainer from '../../common/FlexContainer';
import TrashBin from '../../common/Icon/TrashBin';
import Main from '../../Main';
import PageTitle from '../../shared/PageTitle';
import PriceInfoBox from '../../shared/PriceInfoBox';
import ProductList from '../../shared/ProductList';
import ProductListItem from '../../shared/ProductList/ProductListItem';
import * as Styled from './style';

const CartPage = ({ products }) => {
  return (
    <Main>
      <PageTitle>{PAGES.CART.NAME}</PageTitle>
      <FlexContainer align="flex-start">
        <FlexContainer width="58%" margin="3rem auto 0 1.5rem" direction="column">
          <FlexContainer justifyContent="space-between" align="flex-start">
            <Checkbox>선택해제</Checkbox>
            <Button backgroundColor={PALETTE.WHITE} borderColor={PALETTE.GRAY_002} width="7.3rem" height="3rem">
              상품삭제
            </Button>
          </FlexContainer>
          <Styled.ProductListTitle>든든배송 상품 ({products.length}개)</Styled.ProductListTitle>
          <ProductList isCheckbox={true} products={products} width="100%">
            {products.map((item) => (
              <ProductListItem key={item.id} listStyle="lineStyle" isCheckbox={true} imageSize="9rem" product={item}>
                <FlexContainer direction="column" justifyContent="space-between" align="flex-end">
                  <Button backgroundColor="transparent">
                    <TrashBin width="1.5rem" color={PALETTE.GRAY_002} />
                  </Button>
                  <AmountInput amount={1} setAmount={() => {}} />
                  <p>{item.price.toLocaleString()} 원</p>
                </FlexContainer>
              </ProductListItem>
            ))}
          </ProductList>
        </FlexContainer>
        <PriceInfoBox
          width="30%"
          margin="6rem 1.5rem 0 auto"
          title="결제예상금액"
          priceInfo={{ name: '결제예상금액', price: 21700 }}
          submitInfo={{
            text: '주문하기',
            address: PAGES.CHECKOUT.ADDRESS,
          }}
        />
      </FlexContainer>
    </Main>
  );
};

CartPage.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.shape({
        url: PropTypes.string,
        alt: PropTypes.string,
      }),
      amount: PropTypes.number,
      isChecked: PropTypes.bool,
    })
  ),
};

export default CartPage;
