import React from 'react';

import Image from 'components/Image';
import WhiteButton from 'components/WhiteButton';
import FlexAlignCenter from 'components/FlexWrapper/FlexAlignCenter';
import MarginWrapper from 'components/MarginWrapper';

function HomeButton() {
  return (
    <FlexAlignCenter>
      <MarginWrapper marginRight="14px">
        <Image src="/img/shopping-cart-white.png" width="50" height="44" />
      </MarginWrapper>
      <WhiteButton fontSize="2.5rem" fontWeight="700">
        WOOWA SHOP
      </WhiteButton>
    </FlexAlignCenter>
  );
}

export default HomeButton;
