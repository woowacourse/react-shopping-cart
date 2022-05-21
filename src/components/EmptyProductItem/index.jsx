import noImage from 'assets/no_image.png';

import * as Styled from './styles';

const EmptyProductItem = () => (
  <Styled.Container>
    <img src={noImage} alt="상품이 없습니다" />
    <Styled.Notice>감자가 다 떨어졌어요... 😥</Styled.Notice>
  </Styled.Container>
);

export default EmptyProductItem;
