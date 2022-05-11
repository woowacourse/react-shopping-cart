import React from 'react';

import Image from 'components/Image';
import WhiteButton from 'components/WhiteButton';
import MarginRightWrapper from 'components/MarginRightWrapper';
import FlexAlignCenter from 'components/FlexWrapper/FlexAlignCenter';

function HomeButton() {
  return (
    <FlexAlignCenter>
      <MarginRightWrapper marginRight="14">
        <Image src="/img/shopping-cart-white.png" width="50" height="44" />
      </MarginRightWrapper>
      <WhiteButton fontSize="40" fontWeight="700">
        WOOWA SHOP
      </WhiteButton>
    </FlexAlignCenter>
  );
}

export default HomeButton;
