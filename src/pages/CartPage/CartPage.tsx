import { CartProductState, CartStoreState, Product } from 'types/index';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import CART_MESSAGE from 'constants/message';
import CartItem from 'components/CartItem/CartItem';
import CheckBox from 'components/@shared/CheckBox';
import PATH from 'constants/path';
import axios from 'configs/api';
import { cartActions } from 'redux/actions/actions';
import styled from 'styled-components';

function CartPage() {
  const cart = useSelector(
    (state: { cart: CartStoreState }) => state.cart.cart
  );
  const [cartItems, setCartItems] = useState<Array<CartProductState>>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // 초기에 API 요청을 통해 상품 정보를 받아오는 부분
    if (cartItems.length <= 0) {
      getCartProductsInfo().forEach((cartInfo) => {
        cartInfo.then((info) =>
          setCartItems((prevState) => [...prevState, info])
        );
      });

      return;
    }

    // 체크 여부나 개수가 바뀔 경우 업데이트하는 부분
    setCartItems([]);

    cart.forEach(({ id, stock, checked }) => {
      const item = cartItems.find((cartItem) => cartItem.product.id === id);

      if (item === undefined) return;

      setCartItems((prevState: Array<CartProductState>) => [
        ...prevState,
        { product: item.product, stock, checked },
      ]);
    });
  }, [cart]);

  const getCartProductsInfo = () => {
    return cart.map(async ({ id, stock, checked }) => {
      const { data }: { data: Product } = await axios.get(
        `${PATH.REQUEST_PRODUCT}/${id}`
      );

      return { product: data, stock, checked };
    });
  };

  const calculateTotalMoney = () => {
    return cartItems.reduce((prevMoney, item) => {
      const { product, stock, checked } = item;

      if (!checked) return prevMoney;

      return prevMoney + product.price * stock;
    }, 0);
  };

  const isAllChecked = () => {
    return cartItems.every((item) => item.checked === true);
  };

  const onChangeAllChecked = (
    e: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLElement>
  ) => {
    e.preventDefault();

    dispatch(cartActions.toggleCheckAllProduct(!isAllChecked()));
  };

  const onClickCheckedDeleteButton = () => {
    if (window.confirm(CART_MESSAGE.ASK_DELETE)) {
      dispatch(cartActions.deleteCheckedToCart());
    }
  };

  return (
    <StyledPage>
      <h2>장바구니</h2>
      <hr />
      <StyledContentBox>
        <StyledProductContainer>
          <StyledProductOptions>
            <StyledAllCheckOption>
              <CheckBox
                id="all-check"
                checked={isAllChecked()}
                onChange={onChangeAllChecked}
              />
              <p>전체 선택/해제</p>
            </StyledAllCheckOption>
            <StyledDeleteButton
              type="button"
              onClick={onClickCheckedDeleteButton}
            >
              선택 상품 삭제
            </StyledDeleteButton>
          </StyledProductOptions>
          {cartItems.map(({ product, stock, checked }) => (
            <CartItem
              product={product}
              stock={stock}
              checked={checked}
              key={product.id}
            />
          ))}
        </StyledProductContainer>
        <StyledTotalContainer>
          <h3>결제예상금액</h3>
          <hr />
          <StyledTotalMoney>
            {calculateTotalMoney().toLocaleString('ko-KR')} 원
          </StyledTotalMoney>
          <StyledOrderButton type="button">주문하기</StyledOrderButton>
        </StyledTotalContainer>
      </StyledContentBox>
    </StyledPage>
  );
}

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 800px;
  margin: 50px auto;

  h2 {
    margin-bottom: 20px;

    font-size: 20px;
    font-weight: 900;
  }

  hr {
    width: 100%;
  }
`;

const StyledContentBox = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 80px;

  width: 100%;
  margin-top: 30px;
`;

const StyledProductContainer = styled.div`
  grid-column: 1 / 5;
`;

const StyledProductOptions = styled.div`
  display: flex;
  justify-content: space-between;

  height: 30px;
  margin-bottom: 20px;
`;

const StyledAllCheckOption = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;

  font-size: 15px;
`;

const StyledDeleteButton = styled.button`
  width: 100px;
  border: 1px solid ${({ theme: { colors } }) => colors.lightGray};

  background: ${({ theme: { colors } }) => colors.white};
`;

const StyledTotalContainer = styled.div`
  grid-column: 5 / 7;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 100px;

  height: fit-content;
  padding: 0 20px 20px;
  border: 1px solid ${({ theme: { colors } }) => colors.lightGray};

  background: ${({ theme: { colors } }) => colors.white};

  h3 {
    line-height: 50px;
  }

  hr {
    width: calc(100% + 40px);
    margin: 0 -20px;
  }
`;

const StyledTotalMoney = styled.div`
  line-height: 5px;
  border-bottom: 10px solid ${({ theme: { colors } }) => colors.pink};
  margin: 30px 0;
`;

const StyledOrderButton = styled.button`
  width: 80%;
  height: 40px;
  border-radius: 2px;

  background: ${({ theme: { colors } }) => colors.redPink};
  color: ${({ theme: { colors } }) => colors.white};
`;

export default CartPage;
