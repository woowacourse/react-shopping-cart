import styled from 'styled-components';
import { ReactComponent as Plus } from '../../assets/plus.svg';
import { ReactComponent as Minus } from '../../assets/minus.svg';
import { Product } from '../../types/product';
import useCart from '../ProductItem/hooks/useCart';
import { cartState } from '../../atoms/cart';
import { cartQuantityReadOnlyState } from '../../atoms/product';
import { useRecoilValue } from 'recoil';

type CounterProps = {
  product: Product;
  min: number;
  max: number;
};

const Counter: React.FC<CounterProps> = ({ product, min, max }) => {
  const { cart, addCart, updateCart, deleteCart } = useCart(cartState, product);

  const fetchAddCart = () => {
    fetch('api/cart-items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: product.id,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('장바구니에 상품을 담지 못하였습니다.');

        addCart();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const fetchUpdateCart = (quantity: number) => {
    const cartId = cart.find(({ product }) => product.id)?.id;

    fetch(`api/cart-items/${cartId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('장바구니를 업데이트하지 못하였습니다.');

        return res.json();
      })
      .then((data) => {
        const { quantity } = data;
        updateCart(quantity);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const fetchDeleteCart = () => {
    const cartId = cart.find(({ product }) => product.id)?.id;

    fetch('api/cart-items', {
      method: 'DELETE',
      body: JSON.stringify([cartId]),
    })
      .then((res) => {
        if (!res.ok) throw new Error('장바구니를 삭제하지 못하였습니다.');

        deleteCart();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const cartQuantity = useRecoilValue(cartQuantityReadOnlyState(product.id));

  const handleCartPlus = () => {
    if (cartQuantity === 0) {
      fetchAddCart();
    } else {
      fetchUpdateCart(cartQuantity + 1);
    }
  };

  const handleCartMinus = () => {
    if (cartQuantity === 1) {
      fetchDeleteCart();
    } else {
      fetchUpdateCart(cartQuantity - 1);
    }
  };

  return (
    <Wrapper>
      <ButtonWrapper count={cartQuantity}>
        {cartQuantity !== 0 && (
          <>
            <CounterButton onClick={handleCartMinus} disabled={cartQuantity === min}>
              <Minus width="20px" height="20px" fill={cartQuantity === min ? '#bbbbbb' : '#2bc1bc'} />
            </CounterButton>
            <div>{cartQuantity}</div>
            <CounterButton disabled />
          </>
        )}
      </ButtonWrapper>
      <AbsoluteButton onClick={handleCartPlus} disabled={cartQuantity === max}>
        <Plus width="20px" height="20px" fill={cartQuantity === max ? '#bbbbbb' : '#2bc1bc'} />
      </AbsoluteButton>
    </Wrapper>
  );
};

export default Counter;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  overflow: hidden;
`;

const ButtonWrapper = styled.div<{ count: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 25px;

  width: ${(props) => (props.count === 0 ? '40px' : '190px')};
  height: 40px;

  transition: all 0.25s ease-in-out;

  background-color: white;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
`;

const CounterButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 40px;

  font-size: 30px;
  color: #2bc1bc;
`;

const AbsoluteButton = styled.button`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 40px;

  font-size: 30px;
  color: #2bc1bc;
`;
