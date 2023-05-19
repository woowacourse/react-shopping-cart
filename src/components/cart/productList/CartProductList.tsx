import styled from 'styled-components';
import { ProductSelectItem } from './CartProductItem';
import { Product } from '../../../types/Product';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { cartIdListState } from '../../../atoms/cartIdListAtom';

interface CartProductList {
  id: number;
  quantity: number;
  product: Product;
}

export const ProductSelectList = () => {
  const [cartProductList, setCartProductList] = useState<CartProductList[]>([]);
  const cartIdList = useRecoilValue(cartIdListState);

  useEffect(() => {
    fetch('/cart-items')
      .then((res) => res.json())
      .then((data) => setCartProductList(data));
  }, [cartIdList]);

  return (
    <Style.Container>
      {cartProductList.map((cartProduct) => {
        return (
          <ProductSelectItem key={cartProduct.id} {...cartProduct.product} />
        );
      })}
    </Style.Container>
  );
};

const Style = {
  Container: styled.ul`
    width: 740px;
    height: max-content;

    display: flex;
    flex-direction: column;
  `,
};
