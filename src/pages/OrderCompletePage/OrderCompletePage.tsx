import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/shared/Button/Button';
import baedalyeeImageURL from 'assets/images/no_image.jpg';
import * as T from 'types';
import ROUTES from 'constants/routes';
import Styled from './OrderCompletePage.styles';

const OrderCompletePage = (): ReactElement => {
  return (
    <Styled.Root>
      <Styled.OrderCompleteImage src={baedalyeeImageURL} alt="배달이" />
      <Styled.OrderCompleteText>🐋 주문이 완료되었지롱 🐬</Styled.OrderCompleteText>
      <Styled.ButtonWrapper>
        <Link to={ROUTES.ROOT}>
          <Button text="홈으로" size={T.ButtonSize.REGULAR} />
        </Link>
      </Styled.ButtonWrapper>
    </Styled.Root>
  );
};

export default OrderCompletePage;
