import type { ProductType } from '../../types';

import styled from 'styled-components';
import QuantityInput from '../common/QuantityInput';

import * as api from '../../api';
import { useRecoilState } from 'recoil';
import { cartState } from '../../recoil/state';
import { MAX_QUANTITY } from '../../constants';

interface Props extends ProductType {}

export default function Product({ id, name, price, imageUrl }: Props) {
  const [cart, setCart] = useRecoilState(cartState);

  const cartItem = cart.find((cartItem) => cartItem.product.id === id);

  const addCartItem = () => {
    api.postCartItem(id).then(api.getCart).then(setCart);
  };

  return (
    <Wrapper>
      <Image src={imageUrl} />
      <InfoBox>
        <LabelBox>
          <Name>{name}</Name>
          <Price>{price.toLocaleString()} 원</Price>
        </LabelBox>
        <ControlBox>
          {cartItem ? (
            <QuantityInput cartItemId={cartItem.id} min={0} max={MAX_QUANTITY} />
          ) : (
            <CartIcon src="./cart.svg" onClick={addCartItem} />
          )}
        </ControlBox>
      </InfoBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 282px;
  height: 362px;

  color: #333333;
`;

const Image = styled.img`
  width: 100%;
  height: 282px;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;

  width: 282px;

  padding-top: 18px;
  padding-left: 18px;
`;

const LabelBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled.p`
  margin-top: 4px;

  font-size: 16px;
  font-weight: 400;
`;

const Price = styled.p`
  margin-top: 10px;

  vertical-align: center;
  font-size: 20px;
  font-weight: 400;
`;

const CartIcon = styled.img`
  width: 26px;
  height: 24px;
  margin-right: 10px;

  cursor: pointer;
`;

const ControlBox = styled.div`
  width: auto;
`;
