import Button from 'component/common/Button';
import CheckBox from 'component/common/CheckBox';
import styled from 'styled-components';
import CartProduct from './CartProduct';

export default function CartOperation() {
  return (
    <CartOperationBox>
      <CartOperationHead>
        <label>
          <CheckBox description="선택해제" />
        </label>
        <Button>
          <DeleteButtonContent>상품 삭제</DeleteButtonContent>
        </Button>
      </CartOperationHead>
      <CartOperationBody>
        <CartCounter>
          <p>
            배송 상품 <span>3</span>개
          </p>
        </CartCounter>
        <CartProduct />
      </CartOperationBody>
    </CartOperationBox>
  );
}

const CartOperationBox = styled.div`
  width: 736px;
`;

const CartOperationHead = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 26px;
`;

const CartOperationBody = styled.div``;

const CartCounter = styled.div`
  padding-bottom: 20px;
  border-bottom: 4px solid #aaaaaa;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 33px;
  letter-spacing: 0.5px;

  color: #333333;
`;

const DeleteButtonContent = styled.div`
  width: 117px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #bbbbbb;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;

  color: #333333;

  &:hover {
    background-color: #2ac1bc;
    color: white;
  }
`;
