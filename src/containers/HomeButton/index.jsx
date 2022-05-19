import React from 'react';

import Image from 'components/Image';
import WhiteButton from 'components/WhiteButton';
import MarginWrapper from 'components/MarginWrapper';
import FlexWrapper from 'components/FlexWrapper';

function HomeButton() {
  return (
    <FlexWrapper alignItmes="center">
      <MarginWrapper marginRight="14px">
        <Image
          src={process.env.PUBLIC_URL + '/img/shopping-cart-white.png'}
          width="50"
          height="44"
          alt="홈페이지 로고"
        />
      </MarginWrapper>
      <WhiteButton fontSize="2.5rem" fontWeight="700">
        APEACH SHOP
      </WhiteButton>
    </FlexWrapper>
  );
}

export default HomeButton;
