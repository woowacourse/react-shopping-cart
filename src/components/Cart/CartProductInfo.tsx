import styled from 'styled-components';

import CartProductList from './CartProductList';
import Button from '../Common/Button';
import CheckBox from '../Common/CheckBox';

import useCartProductCount from '../../hooks/useCartProductCount';
import useCheckedCount from '../../hooks/useCheckedCount';
import useMultipleChecked from '../../hooks/useMultipleChecked';
import Message from '../Common/Message';

const CartProductInfo = () => {
  const cartProductCount = useCartProductCount();
  const checkedCount = useCheckedCount();
  const { isAllChecked, toggleAllProductChecked, deleteCheckedProducts } =
    useMultipleChecked();

  return (
    <Container>
      <div>
        <InfoTitle>든든배송 상품 ({cartProductCount}개)</InfoTitle>
        {cartProductCount > 0 ? (
          <CartProductList />
        ) : (
          <MessageWrapper>
            <Message type='cartEmpty' />
          </MessageWrapper>
        )}
        <TotalCartProductWrapper>
          <CheckBox
            id='total-item-check'
            onChange={toggleAllProductChecked}
            checked={isAllChecked}
          />
          <p>
            전체 선택 ({checkedCount}/{cartProductCount})
          </p>
          <Button
            type='button'
            primary={false}
            size='small'
            border
            onClick={deleteCheckedProducts}
          >
            선택삭제
          </Button>
        </TotalCartProductWrapper>
      </div>
    </Container>
  );
};

const Container = styled.section`
  max-width: 740px;
  padding: 120px 0 0 0;
  flex-grow: 1;

  & > div {
    display: flex;
    flex-direction: column;
  }
`;

const InfoTitle = styled.h3`
  height: 90px;
  line-height: 90px;
  font-size: 20px;
  font-weight: 400;
  border-bottom: 4px solid ${({ theme }) => theme.colors.gray400};
`;

const MessageWrapper = styled.div`
  position: relative;
  height: 400px;
`;

const TotalCartProductWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 100px 0;
`;

export default CartProductInfo;
