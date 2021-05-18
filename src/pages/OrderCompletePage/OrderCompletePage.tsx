import React from 'react';
import { Link } from 'react-router-dom';
import Styled from './OrderCompletePage.styles';
import Button from '../../components/shared/Button/Button';
import baedalyeeImageURL from '../../assets/images/no_image.jpg';
import * as T from '../../types';
import ROUTES from '../../constants/routes';

const OrderCompletePage = () => {
  return (
    <Styled.Root>
      <Styled.OrderCompleteImage src={baedalyeeImageURL} alt="배달이" />
      <Styled.OrderCompleteText>🐋 주문이 완료되었지롱 🐬</Styled.OrderCompleteText>
      <Styled.ButtonWrapper>
        <Link to={ROUTES.ROOT}>
          <Button text="홈으로" size={T.ButtonSize.REGULAR} />
        </Link>
        <Button text="주문상세" size={T.ButtonSize.REGULAR} />
      </Styled.ButtonWrapper>
    </Styled.Root>
  );
};

export default OrderCompletePage;
