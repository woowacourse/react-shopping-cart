import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import api from 'api';
import Button from 'components/shared/Button/Button';
import NoImageURL from 'assets/images/no_image.jpg';
import snakeToCamel from 'utils/snakeToCamel';
import * as T from 'types';
import MESSAGE from 'constants/messages';
import Styled from './OrderCompletePage.styles';

interface LocationState {
  orderId: T.Order['orderId'];
}

const OrderCompletePage = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickDetail = async () => {
    const { orderId } = location.state;

    try {
      const response = await api.get(`customers/zigsong/orders/${orderId}`);
      const order = snakeToCamel(response.data);

      history.push({
        pathname: '/order/detail',
        state: { order },
      });
    } catch (error) {
      enqueueSnackbar(MESSAGE.GET_ORDER_DETAIL_FAILURE);
    }
  };

  return (
    <Styled.Root>
      <Styled.OrderCompleteImage src={NoImageURL} alt="item-image" />
      <Styled.OrderCompleteText>🐋 주문이 완료되었지롱 🐬</Styled.OrderCompleteText>
      <Styled.ButtonWrapper>
        <Link to="/">
          <Button text="홈으로" size={T.ButtonSize.LARGE} />
        </Link>
        <Button text="주문상세" size={T.ButtonSize.LARGE} onClick={handleClickDetail} />
      </Styled.ButtonWrapper>
    </Styled.Root>
  );
};

export default OrderCompletePage;
