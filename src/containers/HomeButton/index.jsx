import React from 'react';

import Image from 'components/Image';
import WhiteText from 'components/WhiteText';
import MarginRightWrapper from 'components/MarginRightWrapper';
import FlexAlignCenter from 'components/FlexWrapper/FlexAlignCenter';

function HomeButton() {
  return (
    <FlexAlignCenter>
      <MarginRightWrapper marginRight="14">
        <Image src="/img/shopping-cart-white.png" width="50" height="44" />
      </MarginRightWrapper>
      <WhiteText fontSize="40" fontWeight="700">
        WOOWA SHOP
      </WhiteText>
    </FlexAlignCenter>
  );
}

export default HomeButton;
