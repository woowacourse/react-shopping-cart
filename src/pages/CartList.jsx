import { deleteCartItem } from 'actions/cart';
import Button from 'components/@common/Button/styles';
import CheckBox from 'components/@common/CheckBox';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import CartProducItem from 'components/CartProductItem';
import Layout from 'components/Layout';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from 'styles/theme';
import { CartListContainer, CartListReceiptContainer } from './styles';

const CartList = () => {
  const { items: cartList } = useSelector((state) => state.cart);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    let calculateTotalPrice = 0;

    checkedList.forEach((productId) => {
      const currentProduct = cartList.find((checkedProduct) => checkedProduct.id === productId);
      calculateTotalPrice += currentProduct.price * currentProduct.count;
    });

    setTotalPrice(calculateTotalPrice);

    if (cartList.length > 0) {
      if (checkedList.length >= cartList.length) {
        setSelectAllChecked(true);
      } else {
        setSelectAllChecked(false);
      }
    }
  }, [cartList, checkedList]);

  const handleChecked = (productId) => {
    const prevState = [...checkedList];
    const itemIndex = checkedList.findIndex((id) => id === productId);

    if (itemIndex === -1) {
      setCheckedList([...prevState, productId]);
      return;
    }

    if (checkedList.length === 1) {
      setCheckedList([]);
      return;
    }

    setCheckedList(() => {
      prevState.splice(itemIndex, 1);
      return prevState;
    });
  };

  const isChecked = (productId) => checkedList.findIndex((id) => id === productId) !== -1;

  const checkAllSelectButton = () => {
    if (cartList.length <= 0) {
      setSelectAllChecked(!selectAllChecked);
      return;
    }

    if (checkedList.length >= cartList.length) {
      setCheckedList([]);
      setSelectAllChecked(false);
      return;
    }

    setCheckedList(cartList.map((item) => item.id));
    setSelectAllChecked(true);
  };

  const deleteSelectedItem = () => {
    if (checkedList <= 0) {
      return;
    }

    dispatch(deleteCartItem(checkedList));
    setCheckedList([]);
  };

  return (
    <Layout>
      <CartListContainer>
        <CommonStyled.PageTitle>장바구니</CommonStyled.PageTitle>
        <CommonStyled.HR color={COLORS.BLACK} />
        <CommonStyled.FlexWrapper alignItems="flex-start">
          <CommonStyled.FlexWrapper margin="2rem" flexDirection="column" alignItems="flex-start">
            <CommonStyled.FlexWrapper justifyContent="space-between" margin="1rem 0 2rem 0">
              <CheckBox checkState={selectAllChecked} handleChecked={() => checkAllSelectButton()}>
                {selectAllChecked ? '선택해제' : '전체선택'}
              </CheckBox>
              <Button
                width="7rem"
                height="40px"
                margin="0"
                size="1rem"
                weight="normal"
                onClick={() => deleteSelectedItem()}
              >
                상품삭제
              </Button>
            </CommonStyled.FlexWrapper>
            <p>싱싱배송 상품 ({cartList.length}종)</p>
            <CommonStyled.HR />
            {cartList &&
              cartList.map(({ id, name, thumbnail, price, count }) => (
                <>
                  <CartProducItem
                    key={id}
                    id={id}
                    name={name}
                    thumbnail={thumbnail}
                    price={price}
                    count={count}
                    isChecked={isChecked(id)}
                    handleChecked={() => handleChecked(id)}
                  />
                  <CommonStyled.HR size="1px" />
                </>
              ))}
          </CommonStyled.FlexWrapper>
          <CartListReceiptContainer flexDirection="column" width="60%" alignItems="flex-start">
            <CommonStyled.FlexWrapper padding="1.5rem">
              <CommonStyled.Text>결제예상금액</CommonStyled.Text>
            </CommonStyled.FlexWrapper>
            <CommonStyled.HR margin="0" />
            <CommonStyled.FlexWrapper flexDirection="column" padding="1.5rem">
              <CommonStyled.FlexWrapper justifyContent="space-between">
                <CommonStyled.Text weight="bold" size="0.8rem">
                  결제예상금액
                </CommonStyled.Text>
                <CommonStyled.Text weight="bold" size="0.8rem">
                  {totalPrice.toLocaleString('ko-KR')}원
                </CommonStyled.Text>
              </CommonStyled.FlexWrapper>
              <Button height="60px" margin="3rem 0 0 0" size="1.2rem" weight="normal">
                주문하기({checkedList.length}종)
              </Button>
            </CommonStyled.FlexWrapper>
          </CartListReceiptContainer>
        </CommonStyled.FlexWrapper>
      </CartListContainer>
    </Layout>
  );
};

export default CartList;
