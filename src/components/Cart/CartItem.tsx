import {
  ProductPrice,
  ProductTitle,
  StepperContainer,
  StepperButton,
  StepperQuantity,
  CartItemContainer,
  CartProductImage,
  ProductRow,
  CartContent,
} from './Cart.styles';
import { CartProduct } from '../../types/cart';
import { woowaLogo } from '../../assets/index';
import {
  getCartItems,
  patchDecreaseQuantity,
  patchIncreaseQuantity,
  removeCartItem,
} from '../../apis/cart';
import { useData } from '../../context/DataContext';
import SelectBox from '../SelectBox/SelectBox';

interface CartItemProps {
  cartItem: CartProduct;
  checkedItems: number[];
  setCheckedItems: React.Dispatch<React.SetStateAction<number[]>>;
}

function CartItem({ cartItem, checkedItems, setCheckedItems }: CartItemProps) {
  const { refetch } = useData({
    fetcher: getCartItems,
    name: 'cartItems',
  });

  const handleRemoveCartItem = async () => {
    await removeCartItem(cartItem);
    refetch();
  };

  const handleIncreaseQuantity = async () => {
    await patchIncreaseQuantity(cartItem);
    refetch();
  };

  const handleDecreaseQuantity = async () => {
    if (cartItem.quantity === 0) {
      handleRemoveCartItem();
      return;
    }

    await patchDecreaseQuantity(cartItem);
    refetch();
  };

  return (
    <CartItemContainer>
      <SelectBox
        cartItem={cartItem}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
        onRemove={handleRemoveCartItem}
      />
      <ProductRow>
        <CartProductImage
          src={cartItem.product.imageUrl}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = woowaLogo;
          }}
        />
        <CartContent>
          <ProductTitle>{cartItem.product.name}</ProductTitle>
          <ProductPrice>{cartItem.product.price.toLocaleString()}원</ProductPrice>
          <StepperContainer>
            <StepperButton onClick={handleDecreaseQuantity}>−</StepperButton>
            <StepperQuantity>{cartItem.quantity}</StepperQuantity>
            <StepperButton onClick={handleIncreaseQuantity}>＋</StepperButton>
          </StepperContainer>
        </CartContent>
      </ProductRow>
    </CartItemContainer>
  );
}

export default CartItem;
