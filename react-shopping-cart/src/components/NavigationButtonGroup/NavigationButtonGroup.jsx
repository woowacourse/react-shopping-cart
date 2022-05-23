import FlexWrapper from 'components/@shared/FlexWrapper/FlexWrapper';
import NavigateButton from 'components/@shared/NavigateButton/NavigateButton';

import PATH from 'constants/path';

//재사용O
//TODO: 재사용 가능하게 만들기
function NavigationButtonList() {
  return (
    <FlexWrapper gap="20px">
      <NavigateButton to={PATH.SHOPPING_CART}>장바구니</NavigateButton>
    </FlexWrapper>
  );
}

export default NavigationButtonList;
