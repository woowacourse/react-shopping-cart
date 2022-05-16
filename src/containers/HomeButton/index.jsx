import React from 'react';

import Image from 'components/Image';
import Button from 'components/Button';
import FlexAlignCenter from 'components/FlexWrapper/FlexAlignCenter';
import MarginWrapper from 'components/MarginWrapper';

function HomeButton() {
  return (
    <FlexAlignCenter>
      <MarginWrapper marginRight="14px">
        <Image src="/img/shopping-cart-white.png" width="50" height="44" />
      </MarginWrapper>
      <Button fontSize="2.5rem" fontWeight="700" color="whiteFontColor" border="none">
        WOOWA SHOP
      </Button>
    </FlexAlignCenter>
  );
}

export default HomeButton;
