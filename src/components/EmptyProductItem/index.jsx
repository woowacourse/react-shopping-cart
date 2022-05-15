import * as CommonStyled from 'components/@common/CommonStyle/styles';

import logo from 'assets/logo.png';

const EmptyProductItem = () => (
  <CommonStyled.FlexWrapper>
    <img src={logo} alt="상품이 없습니다" />
    <p>감자가 다 떨어졌어요... 😥</p>
  </CommonStyled.FlexWrapper>
);

export default EmptyProductItem;
