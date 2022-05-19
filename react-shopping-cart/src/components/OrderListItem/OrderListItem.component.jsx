import styled from 'styled-components';
import { Checkbox, Counter, FlexWrapper, Image, Text } from 'components/@shared';
import TrashCan from 'assets/images/trashCan.svg';

const OrderListItemBox = styled(FlexWrapper)`
  justify-content: flex-start;
  align-items: flex-start;
`;

const OrderListItemControlBox = styled(FlexWrapper)`
  align-items: flex-end;
  margin-left: auto;
`;

function OrderListItem({
  id,
  thumbnail,
  name,
  price,
  count,
  handleClickIncrease,
  handleClickDecrease,
}) {
  return (
    <OrderListItemBox>
      <Checkbox />
      <Image style={{ marginLeft: '15px' }} src={thumbnail} type="small" />
      <Text margin="0 0 0 20px" fontSize="medium">
        {name}
      </Text>
      <OrderListItemControlBox isColumnDirection={true}>
        <img style={{ cursor: 'pointer' }} src={TrashCan} alt={`${name} 삭제 아이콘`} />
        <Counter
          style={{ marginTop: '23px' }}
          handleClickIncrease={() => handleClickIncrease(id)}
          handleClickDecrease={() => handleClickDecrease(id)}
        >
          {count}
        </Counter>
        <Text margin="23px 0 0" fontSize="small">
          {price.toLocaleString('ko-kr')}원
        </Text>
      </OrderListItemControlBox>
    </OrderListItemBox>
  );
}

export default OrderListItem;
