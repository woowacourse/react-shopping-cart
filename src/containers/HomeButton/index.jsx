import React from 'react';

import Image from 'components/Image';
import WhiteButton from 'components/WhiteButton';
import MarginRightWrapper from 'components/MarginRightWrapper';
import FlexWrapper from 'components/FlexWrapper';

function HomeButton() {
  return (
    <FlexWrapper alignItmes="center">
      <MarginRightWrapper marginRight="14px">
        <Image src="/img/shopping-cart-white.png" width="50" height="44" />
      </MarginRightWrapper>
      <WhiteButton fontSize="2.5rem" fontWeight="700">
        WOOWA SHOP
      </WhiteButton>
    </FlexWrapper>
  );
}

export default HomeButton;
