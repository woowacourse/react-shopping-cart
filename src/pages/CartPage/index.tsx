import React, { useEffect, useMemo, useState } from 'react';
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
import Box from 'components/@common/Box';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartProductList, isLoading } = useSelector((state: RootState) => state.cartProductList);
  const [checkedIdList, setCheckedIdList] = useState<number[]>([]);

  const handleEntireCheckButtonClick = () => {
    if (checkedIdList.length === cartProductList.length) {
      setCheckedIdList([]);
      return;
    }

    setCheckedIdList(cartProductList.map(({ id }) => id));
  };

  const handleCheckButtonClick = (id: number) => {
    if (isExistInCheckedIdList(id)) {
      setCheckedIdList(checkedIdList.filter((checkedId) => checkedId !== id));
      return;
    }

    setCheckedIdList((prev) => [...prev, id]);
  };

  const handleCheckedCartProductDelete = async () => {
    if (checkedIdList.length === 0) return;

    const fetchList = checkedIdList.map((checkedId) => {
      return fetch(`${process.env.REACT_APP_SERVER_URL}/cartProductList/${checkedId}`, OPTIONS(DELETE));
    });

    await Promise.all([fetchList]);
    loadCartProductList().then((res) => dispatch(setCartProductList(res)));
    setCheckedIdList([]);
  };

  const handleCartProductDelete = async (id: number) => {
    await deleteCartProduct(id);
    loadCartProductList().then((res) => dispatch(setCartProductList(res)));
    setCheckedIdList(checkedIdList.filter((checkedId) => checkedId !== id));
  };

  const isExistInCheckedIdList = (id: number) => {
    return checkedIdList.indexOf(id) !== -1;
  };

  const totalPrice = useMemo(() => {
    const checkedCartProductList = cartProductList.filter(({ id }) => isExistInCheckedIdList(id));

    return checkedCartProductList.reduce((totalPrice, { quantity, price }) => (totalPrice += quantity * price), 0);
  }, [cartProductList, checkedIdList]);

  useEffect(() => {
    dispatch(startCartProductList());
    loadCartProductList().then((res) => dispatch(setCartProductList(res)));
  }, []);

  return (
    <div>
      <MarginWrapper mb="30px">
        <Text color="black" size="32px" weight="bold" align="center">
          장바구니
        </Text>
      </MarginWrapper>
      <Bar h="4px" color="black" />
      <MarginWrapper mt="53px">
        <Flex justify="space-between">
          <Box w="736px">
            <MarginWrapper mb="50px">
              <Flex justify="space-between">
                <Button onClick={handleEntireCheckButtonClick}>
                  <Flex align="center" gap="12px">
                    {cartProductList.length !== 0 && checkedIdList.length === cartProductList.length ? (
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
                  onClick={handleCheckedCartProductDelete}
                >
                  선택 삭제
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
                  isChecked={isExistInCheckedIdList(cartProduct.id)}
                  handleCheckButtonClick={handleCheckButtonClick}
                  handleCartProductDelete={handleCartProductDelete}
                />
              ))
            )}
          </Box>
          <Box w="448px">
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
              <OrderButton w="388px" h="73px" bgColor="gray">
                주문하기({cartProductList.length}개)
              </OrderButton>
            </Styled.OrderWrapper>
          </Box>
        </Flex>
      </MarginWrapper>
    </div>
  );
};

const Styled = {
  OrderWrapper: styled.div`
    width: 448px;
    height: 318px;
    border: 1px solid #dddddd;
    padding: 22px 30px;
  `,
};

export default CartPage;
