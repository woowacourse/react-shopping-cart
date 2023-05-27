import { useSetRecoilState } from 'recoil';

import fetchApis from '@apis/fetchApis';
import { cartItemsState } from '@recoil/atom';
import { TrashCan } from '@assets/index';
import { CartItem as CartItemType } from '@customTypes/Product';

import {
  StyledCartItem,
  StyledCartItemFlexBox,
  StyledFlexBox,
  StyledName,
} from '@components/pages/CartPage/CartListSection/CartList/CartItem/CartItem.styled';
import { Checkbox } from '@commons/Checkbox/Checkbox';
import { SquareImage as CartImage } from '@commons/SquareImage/SquareImage';
import * as Text from '@components/commons/Text/Text';
import ProductStepper from '@components/pages/ProductsPage/ProductList/ProductItem/ProductStepper/ProductStepper';
import { Button as DeleteButton } from '@commons/Button/Button';

const CartItem = (props: CartItemType) => {
  const { product, quantity } = props;
  const { id, name, price, imageUrl } = product;
  const setCartItems = useSetRecoilState(cartItemsState);

  const handleDeleteButtonClick = (productId: number) => {
    const { deleteData } = fetchApis();
    deleteData('/cart-items', `/${productId}`);

    setCartItems(prev => {
      const newCartItems = { ...prev };
      const key = `product${productId}`;
      delete newCartItems[key];

      return newCartItems;
    });

    return;
  };

  return (
    <StyledCartItem>
      <StyledFlexBox>
        <Checkbox productId={id} />
        <CartImage src={imageUrl} alt={name} size="l" />
      </StyledFlexBox>
      <StyledName>
        <Text.Paragraph fontWeight="400">{name}</Text.Paragraph>
      </StyledName>
      <StyledCartItemFlexBox>
        <DeleteButton onClick={() => handleDeleteButtonClick(id)}>
          <TrashCan />
        </DeleteButton>
        <ProductStepper
          product={product}
          initQuantity={quantity}
          initCartItemId={`/${id}`}
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
