import logo from 'assets/logo.png';

import Container from './styles';

const EmptyProductItem = () => (
  <Container>
    <img src={logo} alt="상품이 없습니다" />
    <p>감자가 다 떨어졌어요... 😥</p>
  </Container>
);

export default EmptyProductItem;
