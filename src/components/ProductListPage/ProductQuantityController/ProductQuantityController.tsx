import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartItemIdSelector, cartItemQuantitySelector, cartListAtom } from '../../../stores/cartItemsStore';
import StepperInput from '../../@common/StepperInput/StepperInput';
import * as Styled from './ProductQuantityController.styles';
import ShoppingCartLogo from '../../@common/ShoppingCartLogo/ShoppingCartLogo';
import useUpdateCartItems from '../../../hooks/useUpdateCartItems';
import useGetData from '../../../hooks/useGetData';
import { CartItem } from '../../../types';

type ProductQuantityControllerProps = {
  productId: number;
};

const ProductQuantityController = ({ productId }: ProductQuantityControllerProps) => {
  const productQuantity = useRecoilValue(cartItemQuantitySelector(productId));
  const itemId = useRecoilValue(cartItemIdSelector(productId));
  const setCartList = useSetRecoilState(cartListAtom);
  const { getData } = useGetData<CartItem[]>('/cart-items', (data) => setCartList(data));
  const { updateCartItems, addNewCartItem } = useUpdateCartItems();

  const handleAddToCartButton = async () => {
    await addNewCartItem(productId);
    await getData();
  };

  const handleStepperInputChange = async (value: number) => {
    if (itemId && value !== productQuantity) {
      await updateCartItems({ itemId, itemCount: value });
      await getData();
    }
  };

  return (
    <>
      {productQuantity === 0 ? (
        <Styled.CartButton onClick={handleAddToCartButton}>
          <ShoppingCartLogo isFlipped={true} width={24} height={22} fill='#AAAAAA' />
        </Styled.CartButton>
      ) : (
        <StepperInput initialValue={productQuantity} getValue={handleStepperInputChange} />
      )}
    </>
  );
};

export default ProductQuantityController;
