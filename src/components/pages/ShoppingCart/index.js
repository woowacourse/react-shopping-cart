import React from 'react';
import PageHeader from '../../PageHeader';
import { products } from '../../../mockData';
import PaymentSheet from '../../PaymentSheet';
import { Main, Page } from './index.styles';
import ShoppingItem from '../../ShoppingItem';
import CheckBox from '../../common/CheckBox';
import Button from '../../common/Button';

const ShoppingCart = props => (
  <Page>
    <PageHeader>장바구니</PageHeader>
    <Main>
      <div className="first">
        <div className="controller">
          <div className="flex">
            <CheckBox checked={false} onClick={() => {}} />
            <span>선택해제</span>
          </div>
          <div>
            <Button backgroundColor="black">상품삭제</Button>
          </div>
        </div>
        <div className="legacy">배송 상품</div>
        <ul>
          {products.map(({ id, ...product }) => (
            <li key={id}>
              <ShoppingItem {...product} />
            </li>
          ))}
        </ul>
      </div>
      <div className="second">
        <PaymentSheet
          title="결제예상금액"
          priceInfo="결제예상금액"
          price={10000}
          buttonText="주문하기"
        />
      </div>
    </Main>
  </Page>
);

export default ShoppingCart;
