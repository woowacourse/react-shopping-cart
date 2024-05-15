import { useEffect, useState } from 'react';

import * as Styled from './style';

import { fetchCartItem } from '../../../api';
import Header from '../../Header/Header';
import ItemList from '../../ItemList/ItemList';
import OrderButton from '../../OrderButton/OrderButton';
import Title from '../../Title/Title';
import TotalPaymentInfo from '../../TotalPaymentInfo/TotalPaymentInfo';

import { CartItem } from '../../../type';

const ShoppingCart = () => {
  const [item, setItem] = useState<CartItem[]>();
  useEffect(() => {
    const fetchItems = async () => {
      const items = await fetchCartItem();
      setItem(items);
    };
    fetchItems();
  }, []);

  return (
    <Styled.ShoppingCart>
      <Header title="SHOP" />

      <Styled.Container>
        <Title
          title="장바구니"
          caption={`현재 ${'2'}종류의 상품이 담겨있습니다.`}
        ></Title>
        {item && <ItemList cartItem={item} />}
        <TotalPaymentInfo></TotalPaymentInfo>
      </Styled.Container>
      <OrderButton
        onClick={() => console.log('s')}
        label="주문 확인"
        isOrderable={false}
      />
    </Styled.ShoppingCart>
  );
};

export default ShoppingCart;
