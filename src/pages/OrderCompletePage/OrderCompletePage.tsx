import React from 'react';
import { Link } from 'react-router-dom';
import Styled from './OrderCompletePage.styles';
import Button from '../../components/shared/Button/Button';
import NoImageURL from '../../assets/images/no_image.jpg';
import * as T from '../../types';

const OrderCompletePage = () => {
  return (
    <Styled.Root>
      <Styled.OrderCompleteImage src={NoImageURL} alt="김말이" />
      <Styled.OrderCompleteText>🐋 주문이 완료되었지롱 🐬</Styled.OrderCompleteText>
      <Styled.ButtonWrapper>
        <Link to="/">
          <Button text="홈으로" size={T.ButtonSize.LARGE} />
        </Link>
        <Button text="주문상세" size={T.ButtonSize.LARGE} />
      </Styled.ButtonWrapper>
    </Styled.Root>
  );
};

export default OrderCompletePage;
