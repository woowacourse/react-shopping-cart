import { useRecoilValue } from 'recoil';
import { productQuantitySelector } from '../../stores/cartListStore';
import StepperInput1 from '../@common/StepperInput/StepperInput';
import useUpdateCartList from '../../hooks/useUpdateCartList';
import * as Styled from './ProductQuantityController.styles';
import ShoppingCartLogo from '../@common/ShoppingCartLogo/ShoppingCartLogo';

type ProductQuantityControllerProps = {
  productID: number;
};

const ProductQuantityController = ({ productID }: ProductQuantityControllerProps) => {
  const productQuantity = useRecoilValue(productQuantitySelector(productID));
  const { updateCartList } = useUpdateCartList();

  const handleAddToCartButton = () => {
    updateCartList({ itemId: productID, value: 1 });
  };

  const handleStepperInputChange = (value: number) => {
    if (value !== productQuantity) updateCartList({ itemId: productID, value });
  };

  return (
    <>
      {productQuantity === 0 ? (
        <Styled.CartButton onClick={handleAddToCartButton}>
          <ShoppingCartLogo isFlipped={true} width={24} height={22} fill='#AAAAAA' />
        </Styled.CartButton>
      ) : (
        <StepperInput1 initialValue={1} getValue={handleStepperInputChange} />
      )}
    </>
  );
};

export default ProductQuantityController;
