import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { ReactComponent as UncheckBoxIcon } from 'assets/icon/UncheckBox.svg';
import { ReactComponent as CheckBoxIcon } from 'assets/icon/CheckBox.svg';

import CartProduct from 'components/CartProduct';
import Flex from 'components/@common/Flex';
import MarginWrapper from 'components/@common/MarginWrapper';
import Box from 'components/@common/Box';
import Bar from 'components/@common/Bar';
import Text from 'components/@common/Text';
import Button from 'components/@common/Button';
import { OrderButton } from 'components/@common/Button/Extends';
import SnackBar from 'components/@common/Snackbar';
import useSnackBar from 'hooks/useSnackBar';
import useCartProductList from 'hooks/useCartProductList';

import { OPTIONS } from 'api';
import { deleteCartProduct } from 'api/cart';
import { getCartProductListAsync } from 'store/cartProductList/thunk';
import { getCartProductList } from 'store/cartProductList/actions';
import { isExistInList } from 'utils';
import { DELETE, 상품삭제메시지, 선택상품삭제메시지 } from 'constants/index';

const CartPage = () => {
  const {
    dispatch,
    navigate,
    data: { cartProductList, isLoading, isError, totalPrice },
    checkedIdListState: { checkedIdList, setCheckedIdList, isAllChecked },
  } = useCartProductList();
  const { message, showSnackbar, triggerSnackbar } = useSnackBar(false);

  const handleEntireCheckButtonClick = () => {
    checkedIdList.length === cartProductList.length
      ? setCheckedIdList([])
      : setCheckedIdList(cartProductList.map(({ id }) => id));
  };

  const handleCheckButtonClick = (id: number) => {
    isExistInList<number>(checkedIdList, id)
      ? setCheckedIdList(checkedIdList.filter((checkedId) => checkedId !== id))
      : setCheckedIdList((prev) => [...prev, id]);
  };

  const handleCheckedCartProductDelete = async () => {
    if (checkedIdList.length === 0) return;

    const fetchList = checkedIdList.map((checkedId) =>
      fetch(`${process.env.REACT_APP_SERVER_URL}/cartProductList/${checkedId}`, OPTIONS(DELETE)),
    );
    await Promise.all([fetchList]);

    dispatch(getCartProductListAsync());
    setCheckedIdList([]);
    triggerSnackbar(선택상품삭제메시지);
  };

  const handleCartProductDelete = async (id: number) => {
    await deleteCartProduct(id);

    dispatch(getCartProductListAsync());
    setCheckedIdList(checkedIdList.filter((checkedId) => checkedId !== id));
    triggerSnackbar(상품삭제메시지);
  };

  if (isError) {
    navigate('/notFound');
  }

  useEffect(() => {
    dispatch(getCartProductList());
    dispatch(getCartProductListAsync());
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
                    {isAllChecked ? (
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
                  isChecked={isExistInList<number>(checkedIdList, cartProduct.id)}
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
      {showSnackbar &&
        createPortal(
          <SnackBar message={message} />,
          document.getElementById('snackbar') as HTMLElement,
        )}
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
