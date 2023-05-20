import styled from 'styled-components';
import CartList from '../../components/CartList';

export const CartTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;

  text-align: center;
  letter-spacing: 0.5px;

  margin: 60px 0px 30px 0px;
`;

export const FatBorder = styled.hr`
  border: solid 4px black;
`;

export const CartWrapper = styled.div`
  display: flex;
`;


function Cart() {

  return (
    <div>
      <CartTitle>장바구니</CartTitle>
      <FatBorder />
      <CartWrapper>
        <CartList />
        <div>
          <div>결제예상금액</div>
          <div>
            <div>
              총 상품가격
            </div>
            <div>
              {0}원
            </div>
          </div>
          <div>
            <div>
              총 배송비
            </div>
            <div>
              {0}원
            </div>
          </div>
          <div>
            <div>
              총 주문 금액
            </div>
            <div>
              {0}원
            </div>
          </div>
          <div>
            <button>
              주문하기
            </button>
          </div>
        </div>
      </CartWrapper>
    </div>
  );
}
export default Cart;
