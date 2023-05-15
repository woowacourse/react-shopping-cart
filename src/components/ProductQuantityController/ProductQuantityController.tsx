import { useRecoilValue } from 'recoil';
import { productQuantitySelector } from '../../stores/cartItemsStore';
import StepperInput from '../@common/StepperInput/StepperInput';
import * as Styled from './ProductQuantityController.styles';
import ShoppingCartLogo from '../@common/ShoppingCartLogo/ShoppingCartLogo';
import useUpdateCartItems from '../../hooks/useUpdateCartItems';

type ProductQuantityControllerProps = {
  productID: number;
};

const ProductQuantityController = ({ productID }: ProductQuantityControllerProps) => {
  const productQuantity = useRecoilValue(productQuantitySelector(productID));
  const { updateCartItems, addNewCartItem } = useUpdateCartItems();

  const handleAddToCartButton = () => {
    addNewCartItem(productID);
  };

  const handleStepperInputChange = (value: number) => {
    if (value !== productQuantity) updateCartItems({ itemId: productID, itemCount: value });
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
