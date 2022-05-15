import logo from 'assets/logo.png';

import * as Styled from './styles';

const EmptyProductItem = () => (
  <Styled.Container>
    <img src={logo} alt="상품이 없습니다" />
    <p>감자가 다 떨어졌어요... 😥</p>
  </Styled.Container>
);

export default EmptyProductItem;
