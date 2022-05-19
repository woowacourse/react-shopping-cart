import NavigateButton from 'components/@shared/NavigateButton/NavigateButton';

import { RowFlexWrapper } from 'styles/Wrapper';

import PATH from 'constants/path';

//재사용O
//TODO: 재사용 가능하게 만들기
function NavigationButtonList() {
  return (
    <RowFlexWrapper gap="20px">
      <NavigateButton to={PATH.SHOPPING_CART}>장바구니</NavigateButton>
      <NavigateButton>주문목록</NavigateButton>
    </RowFlexWrapper>
  );
}

export default NavigationButtonList;
