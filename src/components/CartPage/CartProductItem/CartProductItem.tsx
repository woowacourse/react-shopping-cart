/* eslint-disable react-hooks/exhaustive-deps */
import checkIcon from '../../../assets/check.svg';
import trashBin from '../../../assets/trash-bin.svg';
import StepperInput from '../../@common/StepperInput/StepperInput';
import { CartItem } from '../../../types';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartItemIdSelector, cartListAtom } from '../../../stores/cartItemsStore';
import useUpdateCartItems from '../../../hooks/useUpdateCartItems';
import useGetData from '../../../hooks/useGetData';
import * as Styled from './CartProductItem.styles';

type CartProductItemProps = CartItem & {
  check: boolean;
  toggleItemSelection: () => void;
  deleteItemSelection: () => void;
};

const CartProductItem = ({
  product,
  quantity,
  check,
  toggleItemSelection,
  deleteItemSelection,
}: CartProductItemProps) => {
  const { name, price, imageUrl } = product;
  const [itemPrice, setItemPrice] = useState(0);
  const itemId = useRecoilValue(cartItemIdSelector(product.id));
  const { updateCartItems } = useUpdateCartItems();
  const { getData } = useGetData<CartItem[]>('/cart-items', (data) => setCartList(data));
  const setCartList = useSetRecoilState(cartListAtom);

  const handleStepperInputChange = async (value: number) => {
    setItemPrice(value * price);

    if (itemId && value !== quantity) {
      await updateCartItems({ itemId, itemCount: value });
      await getData();
    }
  };

  return (
    <Styled.ProductItem>
      <Styled.Label>
        <Styled.Input type='checkbox' icon={checkIcon} checked={check} onChange={toggleItemSelection} />
      </Styled.Label>
      <Styled.ProductImageContainer>
        <Styled.ProductImage alt={name} src={imageUrl} />
      </Styled.ProductImageContainer>
      <Styled.ProductInfo>
        <Styled.ProductInfoUpperBoundary>
          <Styled.ProductName>{name}</Styled.ProductName>
          <Styled.ProductDeleteButton onClick={deleteItemSelection}>
            <img src={trashBin} alt={`${name}상품 삭제`} />
          </Styled.ProductDeleteButton>
        </Styled.ProductInfoUpperBoundary>
        <StepperInput min={1} max={99} initialValue={quantity} $width={115} getValue={handleStepperInputChange} />
        <Styled.ProductPriceInfo>
          <span>{itemPrice.toLocaleString()}원</span>
        </Styled.ProductPriceInfo>
      </Styled.ProductInfo>
    </Styled.ProductItem>
  );
};

export default CartProductItem;
