import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import cartState from '../../../globalState/atoms/cartState';
import CartItem from '../CartItem/CartItem';
import CheckBox from '../../common/CheckBox/CheckBox';

const CartList = () => {
  const [cartList] = useRecoilState(cartState);

  return (
    <CartListContainer>
      <NumberOfCartItem>배송 상품 ({cartList.length}개)</NumberOfCartItem>
      <ul>
        {cartList.map((cartItem, index) => (
          <li key={cartItem.id}>
            <CartItem cartItem={cartItem} updateCheckedCartList={() => {}} />
            {index !== cartList.length - 1 && <Seperator />}
          </li>
        ))}
      </ul>
      <AllCheckContainer>
        <CheckBox labelText={`전체 선택 (2/${cartList.length})`} />
        <DeleteButton>선택 삭제</DeleteButton>
      </AllCheckContainer>
    </CartListContainer>
  );
};

const CartListContainer = styled.div`
  width: 736px;
`;

const NumberOfCartItem = styled.h3`
  padding: 20px 0;

  border-bottom: 4px solid #aaaaaa;

  font-weight: 400;
  font-size: 20px;
  color: #333;
`;

const Seperator = styled.div`
  border-bottom: 1.5px solid #cccccc;
`;

const AllCheckContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const DeleteButton = styled.button`
  width: 98px;
  height: 35px;

  background: none;
  border: 1px solid #bbbbbb;

  font-weight: 400;
  font-size: 16px;

  cursor: pointer;
`;

export default CartList;
