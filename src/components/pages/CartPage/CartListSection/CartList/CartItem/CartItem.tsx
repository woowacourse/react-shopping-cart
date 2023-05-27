import { useRecoilState } from 'recoil';

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

interface CartItemProps {
  item: CartItemType;
}

const CartItem = (props: CartItemProps) => {
  const { item } = props;
  const { id, name, price, imageUrl } = item.product;
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);

  const handleDeleteButtonClick = (productId: number) => {
    const { deleteData } = fetchApis();
    deleteData('/cart-items', `/${productId}`);

    setCartItems(prev => {
      const newCartItems = { ...prev };

      delete newCartItems[productId];

      return newCartItems;
    });

    return;
  };

  const handleCheckboxClick = () => {
    setCartItems(prev => {
      const newCartItems = {
        ...prev,
      };

      newCartItems[id] = {
        ...newCartItems[id],
        isChecked: !prev[id]?.isChecked,
      };

      return newCartItems;
    });
  };

  return (
    <StyledCartItem>
      <StyledFlexBox>
        <Checkbox
          initIsChecked={cartItems[id]?.isChecked}
          handleCheck={handleCheckboxClick}
          handleUnCheck={handleCheckboxClick}
        />
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
          product={item.product}
          initQuantity={item.quantity}
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
