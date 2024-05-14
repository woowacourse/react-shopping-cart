import { BottomButton, Checkbox } from '@components/common';
import { CountButton } from '@components/common';
import { COLOR } from '@styles/style.constant';
import styled from 'styled-components';

import { UpsideDownExclamation } from '@assets/index';
import { OrderPrice } from '@components/shoppingCart';

// export async function fetchCartItems(): Promise<CartItem[]> {
//   const token = generateBasicToken(USER_ID, USER_PASSWORD);

//   const response = await fetch(`${API_URL}/cart-items`, {
//     method: 'GET',
//     headers: { Authorization: token },
//   });

//   if (!response.ok) {
//     throw new Error('Failed to fetch products');
//   }

//   const data = await response.json();
//   return data.content;
// }

const DeleteButton = styled.button`
  width: 40px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid ${COLOR.borderColor};
  text-align: center;
  font-size: 12px;
  font-weight: 500;
`;

const CartItemCount = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .cart-item-count {
    color: rgba(0, 0, 0, 1);
    font-weight: 700;
    font-size: 24px;
    line-height: 34px;
  }

  .label {
    padding-top: 2px;
    color: rgba(10, 13, 19, 1);
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
  }
`;

const CartItemSelectionGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CartListButtonGroup = styled.div`
  margin-top: 36px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CartItemContainer = styled.section`
  margin-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const CartListContainer = styled.li`
  padding-top: 12px;
`;

const CartItemImage = styled.div`
  width: 112px;
  height: 112px;
  border: 1px solid black;
  border-radius: 8px;
`;

const CartItemDetailContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 12px;
`;

const CartItemDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;

  .label {
    color: rgba(10, 13, 19, 1);
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
  }

  .productPrice {
    color: rgba(0, 0, 0, 1);
    font-weight: 700;
    font-size: 24px;
    line-height: 34px;
  }
`;

const CartItemButtonGroup = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CartInfoBanner = styled.p`
  padding: 52px 0px 12px 0px;
  display: flex;
  align-items: center;
  gap: 4px;

  .label {
    padding-top: 2px;
    color: rgba(10, 13, 19, 1);
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
  }
`;

const OrderPage: React.FC = () => {
  return (
    <>
      {/* cart item count */}
      <CartItemCount>
        <h1 className="cart-item-count">장바구니</h1>
        <p className="label">현재 2종류의 상품이 담겨 있습니다.</p>
      </CartItemCount>
      {/* cart list */}
      <div>
        <CartListButtonGroup>
          <Checkbox checked />
          <span className="label">전체 선택</span>
        </CartListButtonGroup>
        <CartItemContainer>
          {/* cart list item */}
          <CartListContainer>
            <CartItemSelectionGroup>
              <Checkbox checked />
              <DeleteButton>삭제</DeleteButton>
            </CartItemSelectionGroup>
            <CartItemDetailContainer>
              <CartItemImage />
              <CartItemDescriptionContainer>
                <span className="label">상품이름A</span>
                <span className="productPrice">35,000원</span>
                <CartItemButtonGroup>
                  <CountButton sign="minus" />
                  <span>2</span>
                  <CountButton sign="plus" />
                </CartItemButtonGroup>
              </CartItemDescriptionContainer>
            </CartItemDetailContainer>
          </CartListContainer>
          <CartListContainer>
            <CartItemSelectionGroup>
              <Checkbox checked />
              <DeleteButton>삭제</DeleteButton>
            </CartItemSelectionGroup>
            <CartItemDetailContainer>
              <CartItemImage />
              <CartItemDescriptionContainer>
                <span className="label">상품이름A</span>
                <span className="productPrice">35,000원</span>
                <CartItemButtonGroup>
                  <CountButton sign="minus" />
                  <span>2</span>
                  <CountButton sign="plus" />
                </CartItemButtonGroup>
              </CartItemDescriptionContainer>
            </CartItemDetailContainer>
          </CartListContainer>
        </CartItemContainer>
      </div>
      <CartInfoBanner>
        <UpsideDownExclamation />
        <span className="label">총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</span>
      </CartInfoBanner>
      <OrderPrice />
      <BottomButton>주문 확인</BottomButton>
    </>
  );
};

export default OrderPage;
