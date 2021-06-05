import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from 'components/shared/Button/Button';
import NoImageURL from 'assets/images/no_image.jpg';
import api from 'api';
import { ButtonSize } from 'types';
import Styled from './OrderCompletePage.styles';

const OrderCompletePage = () => {
  const history = useHistory();

  const handleClickDetail = async () => {
    const response = await api.get('/orders');
    const orders = response.data;
    const order = orders[orders.length - 1];

    history.push({
      pathname: '/order/detail',
      state: { order },
    });
  };

  return (
    <Styled.Root>
      <Styled.OrderCompleteImage src={NoImageURL} alt="김말이" />
      <Styled.OrderCompleteText>🐋 주문이 완료되었지롱 🐬</Styled.OrderCompleteText>
      <Styled.ButtonWrapper>
        <Link to="/">
          <Button text="홈으로" size={ButtonSize.LARGE} />
        </Link>
        <Button text="주문상세" size={ButtonSize.LARGE} onClick={handleClickDetail} />
      </Styled.ButtonWrapper>
    </Styled.Root>
  );
};

export default OrderCompletePage;
