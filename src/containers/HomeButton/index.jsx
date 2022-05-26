import React from 'react';

import Image from 'components/Image';
import Button from 'components/Button';
import MarginWrapper from 'components/MarginWrapper';
import FlexWrapper from 'components/FlexWrapper';

function HomeButton() {
  return (
    <FlexWrapper alignItems="center">
      <MarginWrapper marginRight="14px">
        <Image src="/img/shopping-cart-white.png" width="50" height="44" />
      </MarginWrapper>
      <Button fontSize="2.5rem" fontWeight="700" color="whiteFontColor" border="none">
        WOOWA SHOP
      </Button>
    </FlexWrapper>
  );
}

export default HomeButton;
