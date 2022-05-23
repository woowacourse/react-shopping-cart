import React from 'react';

import Image from 'components/Image';
import WhiteButton from 'components/WhiteButton';
import MarginWrapper from 'components/MarginWrapper';
import FlexWrapper from 'components/FlexWrapper';
import { Link } from 'react-router-dom';

function HomeButton() {
  return (
    <FlexWrapper alignItmes="center">
      <MarginWrapper marginRight="14px">
        <Link to="/react-shopping-cart">
          <Image
            src={process.env.PUBLIC_URL + '/img/shopping-cart-white.png'}
            width="50"
            height="44"
            alt="홈페이지 로고"
          />
        </Link>
      </MarginWrapper>
      <Link to="/react-shopping-cart">
        <WhiteButton fontSize="2.5rem" fontWeight="700">
          APEACH SHOP
        </WhiteButton>
      </Link>
    </FlexWrapper>
  );
}

export default HomeButton;
