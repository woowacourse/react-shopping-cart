import React from 'react';
import { CartProductData } from 'types';
import styled from 'styled-components';
import { ReactComponent as UncheckBoxIcon } from 'assets/icon/UncheckBox.svg';
import { ReactComponent as CheckBoxIcon } from 'assets/icon/CheckBox.svg';
import { ReactComponent as DeleteIcon } from 'assets/icon/Delete.svg';

import Flex from 'components/common/Flex';
import Button from 'components/common/Button';
import Text from 'components/common/Text';

interface CartProductProp {
  data: CartProductData;
}

const CartProduct = ({ data }: CartProductProp) => {
  const { id, name, price, thumbnail, quantity } = data;

  return (
    <Styled.Wrapper>
      <Flex gap={20}>
        <Styled.SelectBox>
          <UncheckBoxIcon />
        </Styled.SelectBox>

        <Styled.ThumbnailBox>
          <img src={thumbnail} alt="상품을 나타내는 대표 이미지" />
        </Styled.ThumbnailBox>

        <Styled.ProductNameBox>{name}</Styled.ProductNameBox>

        <Styled.TestBox>
          <Flex direction="column" align="flex-end" gap={20}>
            <DeleteIcon />

            <Styled.QuantityControlBox>
              <Flex>
                <Flex align="center">
                  <Styled.QuantityBox>
                    <Text size={24} align="center">
                      {quantity}
                    </Text>
                  </Styled.QuantityBox>
                </Flex>
                <Styled.ControlBox>
                  <Flex direction="column">
                    <Button w={42} h={30}>
                      ▲
                    </Button>
                    <Button w={42} h={30}>
                      ▼
                    </Button>
                  </Flex>
                </Styled.ControlBox>
              </Flex>
            </Styled.QuantityControlBox>

            <Text>{price.toLocaleString()}원</Text>
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
  SelectBox: styled.div``,
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

    button {
      border: 1px solid #dddddd;
    }
  `,
};

export default CartProduct;
