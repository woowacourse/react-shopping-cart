import type { CartItemType } from '../../types';

import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import * as api from '../../api';
import CheckBox from '../common/CheckBox';
import QuantityInput from '../common/QuantityInput';
import { cartState } from '../../recoil/state';
import { MAX_QUANTITY } from '../../constants';

interface Props extends CartItemType {
  checked: boolean;
  toggleChecked: () => void;
  deleteChecked: () => void;
}

export default function CartItem(props: Props) {
  const { id, product, quantity, checked, toggleChecked, deleteChecked } = props;
  const setCart = useSetRecoilState(cartState);

  const removeCartItem = () => {
    deleteChecked();
    api.deleteCartItem(id).then(api.getCart).then(setCart);
  };

  return (
    <Wrapper>
      <CheckBox checked={checked} onClickCheckbox={toggleChecked} />
      <Image src={product.imageUrl} />
      <ProductName>{product.name}</ProductName>
      <ControlBox>
        <RemoveButton onClick={removeCartItem}>
          <TrashCanIcon />
        </RemoveButton>
        <QuantityInput
          cartItemId={id}
          min={1}
          max={MAX_QUANTITY}
          style={{ width: '114px', height: '60px', fontSize: '24px' }}
        />
        <Price>{(product.price * quantity).toLocaleString()}원</Price>
      </ControlBox>
    </Wrapper>
  );
}

const TrashCanIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path d="M0 0H24V24H0V0Z" fill="url(#pattern0)" />
    <defs>
      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_2_205" transform="scale(0.025)" />
      </pattern>
      <image
        id="image0_2_205"
        width="40"
        height="40"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABmUExURbu7u////729vbu7u7y8vLy8vLy8vEdwTLy8vLy8vLy8vL+/v7u7u7y8vLu7u7u7u729vbu7u7+/v7u7u7u7u7u7u7u7u7y8vL6+vru7u7y8vL29vbu7u7u7u7y8vLy8vLu7u7u7u6hNFAIAAAAhdFJOU4ABRsRoNnsAf4N6JJOSfL2+fTBxzPxXvzN4b1Z1zcCC+y6w4fIAAACdSURBVDjL7dTJDsIgFEBROvponedZ7///pKYmDS3QIBuN8W7K4iSEqWoUmIqA9bZSnapT7YKrDVb3ow33OFta8ABr3Z1aX+BsQQXWwm6wsKA4oIapAaVpDjvpdYXZa9RAAnoPSkBxRxgAXXvY39/vgc+DFPP7h78LP3HNxAfFhCVkylMGZQvT4deftjAZD7lJYrzrIvdNnRfxP/vhHjYnSVqiKRrnAAAAAElFTkSuQmCC"
      />
    </defs>
  </svg>
);

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;

  width: 736px;
  height: 144px;
`;

const Image = styled.img`
  width: 144px;
  height: 144px;

  background: rgba(0, 0, 0, 0.05);
`;

const ProductName = styled.p`
  width: 400px;

  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #333333;
`;

const ControlBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;

  width: 112px;
  height: 100%;
`;

const RemoveButton = styled.button`
  width: 24px;
  height: 24px;
  background: transparent;

  transition: width 0.3s;

  &:hover {
    width: 40px;
  }
`;

const Price = styled.div`
  line-height: 24px;
  letter-spacing: 0.5px;
  font-size: 16px;
  color: #333333;
`;
