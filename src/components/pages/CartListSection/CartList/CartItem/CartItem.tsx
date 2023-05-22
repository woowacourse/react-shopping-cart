import { Dispatch } from 'react';

import { Product } from '@customTypes/Product';
import useFetch from '@hooks/useFetch';

import {
  StyledCartItem,
  StyledCartItemFlexBox,
  StyledFlexBox,
  StyledName,
} from '@components/pages/CartListSection/CartList/CartItem/CartItem.styled';
import { Checkbox } from '@commons/Checkbox/Checkbox';
import { SquareImage as CartImage } from '@commons/SquareImage/SquareImage';
import * as Text from '@components/commons/Text/Text';
import ProductStepper from '@components/pages/ProductsPage/ProductList/ProductItem/ProductStepper/ProductStepper';
import { Button as DeleteButton } from '@commons/Button/Button';
import { TrashCan } from '@assets/index';

export interface CartItemProps {
  cartItemId: number;
  quantity: number;
  product: Product;
  setIsDeleteItem: Dispatch<React.SetStateAction<boolean>>;
}

const CartItem = (props: CartItemProps) => {
  const { cartItemId, product, quantity, setIsDeleteItem } = props;
  const { id, name, price, imageUrl } = product;
  const { deleteData } = useFetch('/cart-items');
  const cartItemUrl = `/${cartItemId}`;

  return (
    <StyledCartItem>
      <StyledFlexBox>
        <Checkbox />
        <CartImage src={imageUrl} alt={name} size="l" />
      </StyledFlexBox>
      <StyledName>
        <Text.Paragraph fontWeight="400">{name}</Text.Paragraph>
      </StyledName>
      <StyledCartItemFlexBox>
        <DeleteButton
          onClick={() => {
            deleteData(cartItemUrl);
            setIsDeleteItem(true);
          }}
        >
          <TrashCan />
        </DeleteButton>
        <ProductStepper
          productId={id}
          initQuantity={quantity}
          setIsDeleteItem={setIsDeleteItem}
          initUrl={cartItemUrl}
          inputWidth="72px"
          inputHeight="60px"
          buttonWidth="40px"
          buttonHeight="30px"
        />
        <Text.Description>
          {price.toLocaleString('ko-KR') + ' 원'}
        </Text.Description>
      </StyledCartItemFlexBox>
    </StyledCartItem>
  );
};

export default CartItem;
