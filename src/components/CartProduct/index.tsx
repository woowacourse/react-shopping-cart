import React from 'react';
import { CartProductData } from 'types';
import styled from 'styled-components';
import { ReactComponent as UncheckBoxIcon } from 'assets/icon/UncheckBox.svg';
import { ReactComponent as CheckBoxIcon } from 'assets/icon/CheckBox.svg';
import { ReactComponent as DeleteIcon } from 'assets/icon/Delete.svg';

import { useDispatch } from 'react-redux';

import Flex from 'components/@common/Flex';
import Button from 'components/@common/Button';
import Text from 'components/@common/Text';
import { loadCartProductList, updateCartProduct } from 'api/cart';
import { setCartProductList } from 'store/cartProductList/actions';

interface CartProductProps {
  data: CartProductData;
  isChecked: boolean;
  handleToggleCheckBoxButton: (id: number) => void;
}

const CartProduct = ({ data, isChecked, handleToggleCheckBoxButton }: CartProductProps) => {
  const { id, name, price, thumbnail, quantity } = data;
  const dispatch = useDispatch();

  const handleIncreaseButton = async () => {
    try {
      await updateCartProduct(id, { ...data, quantity: data.quantity + 1 });
      loadCartProductList().then((res) => dispatch(setCartProductList(res)));
    } catch (e) {
      alert(e);
    }
  };

  const handleDecreaseButton = async () => {
    try {
      if (quantity <= 1) return;

      await updateCartProduct(id, { ...data, quantity: data.quantity - 1 });
      loadCartProductList().then((res) => dispatch(setCartProductList(res)));
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Styled.Wrapper>
      <Flex gap="20px">
        <Styled.CheckBox>
          <Button onClick={() => handleToggleCheckBoxButton(id)}>
            {isChecked ? <CheckBoxIcon /> : <UncheckBoxIcon />}
          </Button>
        </Styled.CheckBox>
        <Styled.ThumbnailBox>
          <img src={thumbnail} alt="상품을 나타내는 대표 이미지" />
        </Styled.ThumbnailBox>
        <Styled.ProductNameBox>{name}</Styled.ProductNameBox>
        <Styled.TestBox>
          <Flex direction="column" align="flex-end" gap="20px">
            <Button>
              <DeleteIcon />
            </Button>
            <Styled.QuantityControlBox>
              <Flex>
                <Flex align="center">
                  <Styled.QuantityBox>
                    <Text size="24px" align="center">
                      {quantity}
                    </Text>
                  </Styled.QuantityBox>
                </Flex>
                <Styled.ControlBox>
                  <Flex direction="column">
                    <Button
                      w="42px"
                      h="30px"
                      borderWidth="1px"
                      borderStyle="solid"
                      borderColor="lightGray"
                      onClick={handleIncreaseButton}
                    >
                      ▲
                    </Button>
                    <Button
                      w="42px"
                      h="30px"
                      borderWidth="1px"
                      borderStyle="solid"
                      borderColor="lightGray"
                      onClick={handleDecreaseButton}
                    >
                      ▼
                    </Button>
                  </Flex>
                </Styled.ControlBox>
              </Flex>
            </Styled.QuantityControlBox>
            <Text>{(price * quantity).toLocaleString()}원</Text>
          </Flex>
        </Styled.TestBox>
      </Flex>
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
  CheckBox: styled.div``,
  ThumbnailBox: styled.div`
    width: 144px;
    height: 147px;

    img {
      width: 100%;
      height: 100%;
    }
  `,
  ProductNameBox: styled.div`
    width: 380px;
  `,
  TestBox: styled.div`
    width: 115px;
  `,
  QuantityControlBox: styled.div`
    width: 115px;
    border: 1px solid #dddddd;
  `,
  QuantityBox: styled.div`
    width: 73px;
  `,
  ControlBox: styled.div`
    width: 42px;
  `,
};

export default CartProduct;
