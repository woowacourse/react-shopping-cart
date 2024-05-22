import { useRecoilState } from 'recoil';
import TotalAmount from '../TotalAmount/TotalAmount';
import ItemList from '../ItemList/ItemList';
import Title from '../Title/Title';
import styled from 'styled-components';
import { itemsState } from '../../recoil/atoms';
import { MESSAGES, MESSAGES_PROPS } from '../../constants/Messages';

export const NoCartItemContainer = styled.p`
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.6rem;
  text-align: center;
`;

function CartContent() {
  const [items] = useRecoilState(itemsState);
  return (
    <>
      {items.length !== 0 ? (
        <>
          <Title
            title={MESSAGES.cart}
            subTitle={MESSAGES_PROPS.includedItems(items.length)}
          />
          <ItemList />
          <TotalAmount />
        </>
      ) : (
        <>
          <Title title={MESSAGES.cart} />
          <NoCartItemContainer>{MESSAGES.noItemsInCart}</NoCartItemContainer>
        </>
      )}
    </>
  );
}

export default CartContent;
