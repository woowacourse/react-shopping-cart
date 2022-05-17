import Checkbox from 'components/base/checkBox/CheckBox';
import Header from 'components/base/header/Header';
import Title from 'components/base/title/Title';
import PageTitle from 'components/pageTitle/PageTitle';
import PaymentAccount from 'components/paymentAccount/PaymentAccount';
import ShoppingCartItem from 'components/shoppingCartItem/ShoppingCartItem';

import {
  ContentWrapper,
  PageWrapper,
  ShoppingCartItemContainer,
  PaymentAccountContainer,
  ProductDeleteButton,
  ShoppingCartContainer,
  UnderLine,
} from './style';

const ShoppingCartPage = () => {
  return (
    <PageWrapper>
      <PageTitle title="장바구니" />
      <ContentWrapper>
        <ShoppingCartContainer>
          <Header
            left={<Checkbox label="전체선택" />}
            right={<ProductDeleteButton>상품삭제</ProductDeleteButton>}
          />
          <Title title="든든배송 상품" />
          <ShoppingCartItemContainer>
            <ShoppingCartItem></ShoppingCartItem>
            <UnderLine />
            <ShoppingCartItem></ShoppingCartItem>
            <UnderLine />
            <ShoppingCartItem></ShoppingCartItem>
            <UnderLine />
            <ShoppingCartItem></ShoppingCartItem>
            <UnderLine />
            <ShoppingCartItem></ShoppingCartItem>
            <UnderLine />
          </ShoppingCartItemContainer>
        </ShoppingCartContainer>
        <PaymentAccountContainer>
          <PaymentAccount />
        </PaymentAccountContainer>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default ShoppingCartPage;
