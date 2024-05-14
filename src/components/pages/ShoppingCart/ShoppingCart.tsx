import Header from '../../Header/Header';
import Title from '../../Title/Title';

import * as Styled from './style';

const ShoppingCart = () => {
  return (
    <Styled.ShoppingCart>
      <Header title="SHOP" />
      <Title
        title="장바구니"
        caption={`현재 ${'2'}종류의 상품이 담겨있습니다.`}
      ></Title>
      {/* <ItemList></ItemList>
      <ItemTotal></ItemTotal> */}
      Order
    </Styled.ShoppingCart>
  );
};

export default ShoppingCart;
