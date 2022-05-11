import React from 'react';
import PropTypes from 'prop-types';

import {
  ProductCartPageWrapper,
  HeaderWrapper,
  CheckBoxWrapper,
  ListHeaderWrapper,
  CartListWrapper,
  SelectDeleteWrapper,
  CartInfoWrapper,
  SelectCartWrapper,
} from 'page/ProductCartPage/style';

import CheckBox from 'component/common/CheckBox';
import AmountBox from 'component/AmountBox';
import Button from 'component/common/Button';

import CartItem from 'component/CartItem';

const mockData = [
  {
    id: 29,
    name: '[든든] 주부유부왕 500g',
    image: 'https://cdn-mart.baemin.com/sellergoods/main/ad846ff8-c698-44ac-8953-2624627b0f63.jpg',
    price: 4800,
  },
  {
    id: 30,
    name: '[든든] 주부유부왕 300g',
    image: 'https://cdn-mart.baemin.com/sellergoods/main/a314c955-fb59-4bc7-955c-9fcaa155dd72.jpg',
    price: 3300,
  },
  {
    id: 31,
    name: '[든든] 유부 슬라이스 500g',
    image: 'https://cdn-mart.baemin.com/goods/custom/20200525/11153-main-01.png',
    price: 4900,
  },
];

export default function ProductCartPage() {
  return (
    <ProductCartPageWrapper>
      <HeaderWrapper>장바구니</HeaderWrapper>
      <CartInfoWrapper>
        <SelectCartWrapper>
          <SelectDeleteWrapper>
            <CheckBoxWrapper>
              <CheckBox />
              선택해제
            </CheckBoxWrapper>
            <Button>상품삭제</Button>
          </SelectDeleteWrapper>

          <ListHeaderWrapper>든든배송 상품 (개)</ListHeaderWrapper>
          <CartListWrapper>
            {mockData.map(({image: itemImgURL, name: itemName, price: itemPrice, id}) => (
              <>
                <CartItem
                  itemImgURL={itemImgURL}
                  itemName={itemName}
                  itemPrice={itemPrice}
                  key={id}
                />
                <hr />
              </>
            ))}
          </CartListWrapper>
        </SelectCartWrapper>

        <AmountBox />
      </CartInfoWrapper>
    </ProductCartPageWrapper>
  );
}

ProductCartPage.propTypes = {
  itemImgURL: PropTypes.string,
  itemName: PropTypes.string,
  itemPrice: PropTypes.string,
};
