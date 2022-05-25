import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { ReactComponent as UncheckBoxIcon } from 'assets/icon/UncheckBox.svg';
import { ReactComponent as CheckBoxIcon } from 'assets/icon/CheckBox.svg';
import { ReactComponent as DeleteIcon } from 'assets/icon/Delete.svg';

import Box from 'components/@common/Box';
import QuantityControlBox from 'components/@common/QuantityControlBox';
import Flex from 'components/@common/Flex';
import Button from 'components/@common/Button';
import Text from 'components/@common/Text';
import SnackBar from 'components/@common/Snackbar';
import useAppDispatch from 'hooks/useAppDispatch';
import useSnackBar from 'hooks/useSnackBar';

import { updateCartProduct } from 'api/cart';
import { getCartProductListAsync } from 'store/cartProductList/thunk';
import { 수량감소메시지, 수량증가메시지 } from 'constants/index';
import { CartProductData } from 'types';

interface CartProductProps {
  data: CartProductData;
  isChecked: boolean;
  handleCheckButtonClick: (id: number) => void;
  handleCartProductDelete: (id: number) => void;
}

const CartProduct = ({
  data,
  isChecked,
  handleCheckButtonClick,
  handleCartProductDelete,
}: CartProductProps) => {
  const dispatch = useAppDispatch();
  const { message, showSnackbar, triggerSnackbar } = useSnackBar(false);
  const { id, name, price, thumbnail, quantity } = data;

  const handleIncreaseButton = async (): Promise<void> => {
    try {
      await updateCartProduct(id, { ...data, quantity: quantity + 1 });
      dispatch(getCartProductListAsync());
      triggerSnackbar(수량증가메시지);
    } catch (e) {
      alert(e);
    }
  };

  const handleDecreaseButton = async (): Promise<void> => {
    try {
      await updateCartProduct(id, { ...data, quantity: quantity - 1 });
      dispatch(getCartProductListAsync());
      triggerSnackbar(수량감소메시지);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Styled.Wrapper>
      <Flex gap="20px">
        <Box>
          <Button onClick={() => handleCheckButtonClick(id)}>
            {isChecked ? <CheckBoxIcon /> : <UncheckBoxIcon />}
          </Button>
        </Box>
        <Styled.ThumbnailBox>
          <img src={thumbnail} alt="상품을 나타내는 대표 이미지" />
        </Styled.ThumbnailBox>
        <Box w="380px">{name}</Box>
        <Box w="115px">
          <Flex direction="column" align="flex-end" gap="20px">
            <Button onClick={() => handleCartProductDelete(id)}>
              <DeleteIcon />
            </Button>
            <QuantityControlBox
              quantity={quantity}
              handleIncreaseButton={handleIncreaseButton}
              handleDecreaseButton={handleDecreaseButton}
            />
            <Text as="span">{(price * quantity).toLocaleString()}원</Text>
          </Flex>
        </Box>
      </Flex>
      {showSnackbar &&
        createPortal(
          <SnackBar message={message} />,
          document.getElementById('snackbar') as HTMLElement,
        )}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.div`
    max-width: 735px;
    height: 200px;
    border-top: 1px solid #cccccc;
    padding: 23px 0;
  `,
  ThumbnailBox: styled.div`
    width: 144px;
    height: 147px;

    img {
      width: 100%;
      height: 100%;
    }
  `,
};

export default CartProduct;
