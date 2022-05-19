import styled from 'styled-components';
import { Divider } from 'components/@shared';
import OrderListItem from 'components/OrderListItem/OrderListItem.component';
import { PALETTE } from 'styles/theme';

const OrderListItemBox = styled.div`
  width: 100%;
`;

function OrderListContainer({ orderList }) {
  return (
    <>
      {orderList.map((productInfo, index) => (
        <OrderListItemBox key={productInfo.id}>
          <OrderListItem count={1} {...productInfo} />
          {orderList.length - 1 !== index ? (
            <Divider height="1.5px" margin="24px 0 26px" backgroundColor={PALETTE.GRAY_005} />
          ) : null}
        </OrderListItemBox>
      ))}
    </>
  );
}

export default OrderListContainer;
