import { useRecoilState, useRecoilValue } from 'recoil';
import CartTotalAmount from '../TotalAmount/CartTotalAmount';
import ItemList from '../ItemList/ItemList';
import Title from '../Title/Title';
import styled from 'styled-components';
import { itemsState } from '../../recoil/atoms';
import { MESSAGES, MESSAGES_PROPS } from '../../constants/Messages';
import Footer from '../Footer/Footer';
import { URL_PATH } from '../../constants/UrlPath';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchItems } from '../../api';
import { checkedItemsSelector } from '../../recoil/selectors';

const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 3.6rem 2.4rem 10.4rem 2.4rem;
  box-sizing: border-box;
  height: 100%;
`;
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
  const [items, setItems] = useRecoilState(itemsState);
  const checkedItems = useRecoilValue(checkedItemsSelector);
  useEffect(() => {
    fetchItems()
      .then(setItems)
      .catch((e) => {
        throw new Error(e);
      });
  }, [setItems]);

  const navigate = useNavigate();

  const handleFooterClick = () => {
    navigate(URL_PATH.orderConfirm);
  };
  return (
    <>
      <ContentWrapper>
        {items.length !== 0 ? (
          <>
            <Title
              title={MESSAGES.cart}
              subTitle={MESSAGES_PROPS.includedItems(items.length)}
            />
            <ItemList />
            <CartTotalAmount />
          </>
        ) : (
          <>
            <Title title={MESSAGES.cart} />
            <NoCartItemContainer>{MESSAGES.noItemsInCart}</NoCartItemContainer>
          </>
        )}
      </ContentWrapper>
      <Footer
        value={MESSAGES.confirm}
        isDisabled={items.length === 0 || checkedItems.length === 0}
        onClick={handleFooterClick}
      />
    </>
  );
}

export default CartContent;
