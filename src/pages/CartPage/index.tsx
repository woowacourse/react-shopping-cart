import React, { useEffect, useReducer, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCartProductList, setCartProductList } from 'store/cartProductList/actions';
import { RootState } from 'store';
import { loadCartProductList, deleteCartProduct } from 'api/cart';
import styled from 'styled-components';
import Bar from 'components/@common/Bar';
import Text from 'components/@common/Text';
import CartProduct from 'components/CartProduct';
import Flex from 'components/@common/Flex';
import { ReactComponent as UncheckBoxIcon } from 'assets/icon/UncheckBox.svg';
import { ReactComponent as CheckBoxIcon } from 'assets/icon/CheckBox.svg';
import Button, { OrderButton } from 'components/@common/Button';
import MarginWrapper from 'components/@common/MarginWrapper';
import { OPTIONS } from 'api';
import { DELETE } from 'constants/index';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartProductList, isLoading } = useSelector((state: RootState) => state.cartProductList);
  const [checkedCartProductList, setCheckedCartProductList] = useState<number[]>([]);

  const handleToggleEntireCheckBoxButton = (isChecked: boolean) => {
    if (isChecked) {
      setCheckedCartProductList([]);
      return;
    }

    setCheckedCartProductList(cartProductList.map(({ id }) => id));
  };

  const handleToggleCheckBoxButton = (id: number) => {
    if (isExistInCheckedList(id)) {
      const filteredCheckedCartProductList = checkedCartProductList.filter(
        (checkedCartProduct) => checkedCartProduct !== id,
      );
      setCheckedCartProductList(filteredCheckedCartProductList);
      return;
    }

    setCheckedCartProductList((prev) => [...prev, id]);
  };

  const handleDeleteEntireCartProduct = async () => {
    if (checkedCartProductList.length === 0) return;

    const deleteFetchList = checkedCartProductList.map((checkedCartProduct) => {
      return fetch(
        `${process.env.REACT_APP_SERVER_URL}/cartProductList/${checkedCartProduct}`,
        OPTIONS(DELETE),
      );
    });

    await Promise.all([deleteFetchList]);
    loadCartProductList().then((res) => dispatch(setCartProductList(res)));
  };

  const handleDeleteCartProduct = async (id: number) => {
    await deleteCartProduct(id);
    loadCartProductList().then((res) => dispatch(setCartProductList(res)));
  };

  const isExistInCheckedList = (id: number) => {
    return checkedCartProductList.indexOf(id) !== -1;
  };

  const totalPrice = useMemo(() => {
    const filteredCartProductList = cartProductList.filter(({ id }) => isExistInCheckedList(id));

    return filteredCartProductList.reduce(
      (totalPrice, { quantity, price }) => (totalPrice += quantity * price),
      0,
    );
  }, [cartProductList, checkedCartProductList]);

  useEffect(() => {
    dispatch(startCartProductList());
    loadCartProductList().then((res) => dispatch(setCartProductList(res)));
  }, []);

  return (
    <Styled.Container>
      <MarginWrapper mb="30px">
        <Text color="black" size="32px" weight="bold" align="center">
          장바구니
        </Text>
      </MarginWrapper>
      <Bar h="4px" color="black" />
      <Styled.Content>
        <Flex justify="space-between">
          <Styled.CartListBox>
            <MarginWrapper mb="50px">
              <Flex justify="space-between">
                <Button
                  onClick={() =>
                    handleToggleEntireCheckBoxButton(
                      checkedCartProductList.length === cartProductList.length,
                    )
                  }
                >
                  <Flex align="center" gap="12px">
                    {checkedCartProductList.length === cartProductList.length &&
                    cartProductList.length !== 0 ? (
                      <>
                        <CheckBoxIcon />
                        <Text size="16px">전체해제</Text>
                      </>
                    ) : (
                      <>
                        <UncheckBoxIcon />
                        <Text size="16px">전체선택</Text>
                      </>
                    )}
                  </Flex>
                </Button>
                <Button
                  w="117px"
                  h="50px"
                  borderWidth="1px"
                  borderStyle="solid"
                  borderColor="gray"
                  onClick={handleDeleteEntireCartProduct}
                >
                  상품삭제
                </Button>
              </Flex>
            </MarginWrapper>
            <MarginWrapper mb="16px">
              <Text>배송 상품 ({cartProductList.length}개)</Text>
            </MarginWrapper>
            {isLoading ? (
              <div>상품을 불러오고 있습니다...</div>
            ) : (
              cartProductList.map((cartProduct) => (
                <CartProduct
                  key={cartProduct.id}
                  data={cartProduct}
                  isChecked={isExistInCheckedList(cartProduct.id)}
                  handleToggleCheckBoxButton={handleToggleCheckBoxButton}
                  handleDeleteCartProduct={handleDeleteCartProduct}
                />
              ))
            )}
          </Styled.CartListBox>
          <Styled.OrderBox>
            <Styled.OrderWrapper>
              <MarginWrapper mb="20px">
                <Text size="24px">결제예상금액</Text>
              </MarginWrapper>
              <Bar color="gray" h="3px" />
              <MarginWrapper mt="34px" mb="68px">
                <Flex justify="space-between">
                  <Text size="20px" weight={700}>
                    결제예상금액
                  </Text>
                  <Text size="20px" weight={700}>
                    {totalPrice.toLocaleString()}원
                  </Text>
                </Flex>
              </MarginWrapper>
              <OrderButton w="388px" h="73px" bgColor="mint">
                주문하기({cartProductList.length}개)
              </OrderButton>
            </Styled.OrderWrapper>
          </Styled.OrderBox>
        </Flex>
      </Styled.Content>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.div``,
  Content: styled.div`
    margin-top: 53px;
  `,
  CartListBox: styled.div`
    width: 736px;
  `,
  OrderBox: styled.div`
    width: 448px;
  `,
  OrderWrapper: styled.div`
    width: 448px;
    height: 318px;
    border: 1px solid #dddddd;
    padding: 22px 30px;
  `,
};

export default CartPage;
